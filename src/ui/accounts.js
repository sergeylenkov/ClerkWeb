function Accounts() {
    var self = this;
    var view;
    var accounts;
    var type = data.accountType.deposit;

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

            self.initForm();
        });
    }

    this.initForm = function() {
        $("#accounts_form").css("opacity", 0);

        $("#account_form").find("#button_cancel").click(function() {
            $("#accounts_form").transition({ "opacity": 0 }, 300);
            $("#accounts_list").find(".account").removeClass("selected");
        });

        $("#account_form").submit(function(event) {
            data.saveAccount($("#account_form").serialize(), function(response) {
                if (!response.error) {
                    $("#accounts_form").transition({ "opacity": 0 }, 300, function() {
                        self.update();
                    });
                }
            });

            event.preventDefault();
        });

        data.currencies(function(currencies) {
            for (var i = 0; i < currencies.length; i++) {
                $("#account_form_currency").append($('<option>', {value: currencies[i].id, text: currencies[i].name}));
            }
        });

        $("#account_form_type").append($('<option>', {value: 0, text: "Доход"}));
        $("#account_form_type").append($('<option>', {value: 1, text: "Депозит"}));
        $("#account_form_type").append($('<option>', {value: 2, text: "Расход"}));
        $("#account_form_type").append($('<option>', {value: 3, text: "Долг"}));
    }

    this.edit = function(account) {
        $("#account_form_name").val(account.name);
        $("#account_form_currency").val(account.currency_id);
        $("#account_form_credit_limit").val(0);

        $("#credit_limit_field").hide();

        if (account.credit_limit > 0) {
            $("#account_form_credit_limit").val(account.credit_limit);
            $("#credit_limit_field").show();
        }

        $("#account_form_type").val(account.type_id);
        $("#account_form_type").attr("disabled", "disabled");

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

                if (account.type_id == data.accountType.receipt) {
                    amountItem.html(response.expense.formatAmount());
                } else if (account.type_id == data.accountType.expense) {
                    amountItem.html("-" + response.receipt.formatAmount());
                } else {
                    amountItem.html(response.balance.formatAmount());
                }
            }
        });
    }

    this.selectAccountType = function(sender, type) {
        if (sender.hasClass("active")) {
            return;
        }

        $("#accounts_filter").find(".button").removeClass("active");
        sender.addClass("active");

        $("#accounts_form").transition({ "opacity": 0 }, 300);
        $("#accounts_list").find(".account").removeClass("selected");

        self.type = type;
        self.update();
    }

    this.update = function() {
        $("#accounts_list").html("");

        data.accounts(self.type, true, function(accounts) {
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
