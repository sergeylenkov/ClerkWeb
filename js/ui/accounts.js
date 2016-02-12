function Accounts() {
    var self = this;
    var view;

    this.load = function(container) {
        $.get("templates/accounts.html", function(html) {
            view = $(html);
            container.append(view);

            $("#accounts_list").html("");

            $("#accounts_list").append($("<div/>", { "class": "header", text: "Депозиты" }));

            data.accounts(data.accountType.deposit, true, function(accounts) {
                $.get("templates/accounts-item.html", function(html) {
                    for (var i = 0; i < accounts.length; i++) {
                        var item = $(html);
                        item.attr("index", accounts[i].id);
                        item.find(".account_name").text(accounts[i].name);

                        $("#accounts_list").append(item);

                        self.balance(item, accounts[i]);

                        item.click(function() {
                            sefl.edit();
                        });
                    }
                });
            });
        });
    }

    this.edit = function(account) {
        
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
}
