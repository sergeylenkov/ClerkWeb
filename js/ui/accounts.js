function Accounts() {
    var self = this;
    var view;
    var accounts;

    this.load = function(container) {
        $.get("templates/accounts.html", function(html) {
            view = $(html);
            container.append(view);

            $("#accounts_filter_deposits").click(function() {
                self.selectAccountType($(this), data.accountType.deposit);
            });

            $("#accounts_filter_expenses").click(function() {
                self.selectAccountType($(this), data.accountType.expense);
            });

            $("#accounts_filter_receipts").click(function() {
                self.selectAccountType($(this), data.accountType.receipt);
            });

            $("#accounts_filter_deposits").click();

            $("#accounts_form").css("opacity", 0);
            $("#account_form").find("#button_cancel").click(function() {
                $("#accounts_form").transition({ "opacity": 0 }, 300);
            });
        });
    }

    this.edit = function(account) {
        $("#account_form_name").val(account.name);

        $("input[name=id]").val(account.id);
        $("input[name=mode]").val("update");
        $("input[name=submit]").val("Изменить");

        $("#accounts_form").transition({ "opacity": 1 }, 300);
    }

    this.balance = function(item, account) {
        data.accountBalance(account, function(response) {
            var amountItem = item.find(".account_balance");
            var amountInfoItem = item.find(".info");

            if (account.credit_limit) {
                var balance = account.credit_limit + response.balance;

                amountItem.html(balance.formatAmount());

                var sign = " + ";

                if (response.balance < 0) {
                    sign = " - ";
                }

                amountInfoItem.html("(" + account.credit_limit.formatAmount() + sign + Math.abs(response.balance).formatAmount() + ")");
            } else {
                amountInfoItem.hide();
                amountItem.html(response.balance.formatAmount());
            }
        });
    }

    this.selectAccountType = function(sender, type) {
        if (sender.hasClass("active")) {
            return;
        }

        $("#accounts_filter").find(".button").removeClass("active");
        sender.addClass("active");

        $("#accounts_list").html("");

        data.accounts(type, true, function(accounts) {
            self.accounts = accounts;

            $.get("templates/accounts-item.html", function(html) {
                for (var i = 0; i < self.accounts.length; i++) {
                    var item = $(html);
                    item.attr("index", i);
                    item.find(".account_name").text(accounts[i].name);

                    $("#accounts_list").append(item);

                    self.balance(item, accounts[i]);

                    item.click(function() {
                        $("#accounts_list").find(".account").removeClass("selected");

                        $(this).addClass("selected");
                        self.edit(self.accounts[$(this).attr("index")]);
                    });
                }
            });
        });
    }
}
