function Transactions() {
    var self = this;
    var fromDate = Date.today();
    var toDate = Date.today();
    var accountId;
    var settings = window['localStorage'];
    var datePicker;
    var transactions;

    this.load = function(container) {
        $.get("templates/transactions.html", function(html) {
            var list = $(html);
            container.append(list);

            $("#filter-period").css("opacity", 0);
            $("#filter-period").hide();

            $("#transactions-filter-period").click(function() {
                if ($(this).hasClass("active")) {
                    return;
                }

                $("#transactions-filter").find(".button").removeClass("active");
                $(this).addClass("active");

                $("#filter-period").show();
                $("#filter-period").transition({"opacity": 1}, 300);

                if (settings['from_date_filter']) {
                    fromDate = Date.parse(settings['from_date_filter']);
                }

                if (settings['to_date_filter']) {
                    toDate = Date.parse(settings['to_date_filter']);
                }

                self.updateList();
            });

            $("#transactions-filter-week").click(function() {
                if ($(this).hasClass("active")) {
                    return;
                }

                $("#transactions-filter").find(".button").removeClass("active");
                $(this).addClass("active");

                $("#filter-period").transition({"opacity": 0}, 300);

                fromDate = Date.today().setWeek(Date.today().getWeek());
                toDate = Date.today().moveToDayOfWeek(0, 1);

                self.updateList();
            });

            $("#transactions-filter-month").click(function() {
                if ($(this).hasClass("active")) {
                    return;
                }

                $("#transactions-filter").find(".button").removeClass("active");
                $(this).addClass("active");

                $("#filter-period").transition({"opacity": 0}, 300);

                fromDate = Date.today().moveToFirstDayOfMonth();
                toDate = Date.today().moveToLastDayOfMonth();

                self.updateList();
            });

            var defaultDate = Date.today();

            if (settings['from_date_filter']) {
                defaultDate = Date.parse(settings['from_date_filter']);
            }

            $("#from_date").pikaday({
                firstDay: 1,
                defaultDate: defaultDate,
                onSelect: function () {
                     fromDate = new Date(this.getDate());
                     $("#from_date").val(fromDate.toString("yyyy-MM-dd"));
                     settings['from_date_filter'] = fromDate.toString("yyyy-MM-dd");

                     self.updateList();
                }
            });

            defaultDate = Date.today();

            if (settings['to_date_filter']) {
                defaultDate = Date.parse(settings['to_date_filter']);
            }

            $("#to_date").pikaday({
                firstDay: 1,
                defaultDate: defaultDate,
                onSelect: function () {
                    toDate = new Date(this.getDate());
                    $("#to_date").val(toDate.toString("yyyy-MM-dd"));
                    settings['to_date_filter'] = toDate.toString("yyyy-MM-dd");

                    self.updateList();
                }
            });

            $("#from_date").val(fromDate.toString("yyyy-MM-dd"));

            if (settings['from_date_filter']) {
                $("#from_date").val(settings['from_date_filter']);
            }

            $("#to_date").val(toDate.toString("yyyy-MM-dd"));

            if (settings['to_date_filter']) {
                $("#to_date").val(settings['to_date_filter']);
            }

            $("#transactions-filter-text").keyup(function() {
                self.filter($(this).val());
                self.updateAmount();
            });

            $("#transactions-filter-week").click();

            self.initForm();
        });
    }

    this.initForm = function () {
        self.fillAccountsSelect();

        $("#button-new-transaction").click(function () {
            var date = new Date(datePicker.getDate());

            $("input[name=id]").val("");
            $("input[name=mode]").val("insert");
            $("input[name=submit]").val("Добавить");

            $("#to_amount").val("");
            $("#from_amount").val("");
            $("#transaction_tags").val("");
            $("#transaction_tags").tagit("removeAll");
            $("#transaction_date").val(date.toString("yyyy-MM-dd"));

            $("#button-new-transaction").fadeOut(300, function() {
                $("#transaction-new").fadeIn(300);
            });
        });

        $("#button_cancel").click(function () {
            $("#transaction-new").fadeOut(300, function() {
                $("#button-new-transaction").fadeIn(300);
            });
        });

        $("#from_amount").change(function () {
            if ($("#to_amount").val() == "") {
                $("#to_amount").val($("#from_amount").val());
            }
        });

        datePicker = new Pikaday({
            field: document.getElementById('transaction_date'),
            firstDay: 1,
            defaultDate: new Date(),
            format: 'yyyy-MM-dd',
            onSelect: function () {
                var date = new Date(this.getDate());
                $("#transaction_date").val(date.toString("yyyy-MM-dd"));
            }
        });

        datePicker.setDate(Date.today().toString('yyyy-MM-dd'));

        $("#transaction-form").submit(function (event) {
            data.saveTransaction($("#transaction-form").serialize(), function(response) {
                if (!response.error) {
                    $("#transaction-new").fadeOut(300, function() {
                        $("#button-new-transaction").fadeIn(300);

                        $("#transactions-list").fadeOut(300, function() {
                            self.update();

                            $("#transactions-list").fadeIn(300);
                        });
                    });
                }
            });

            event.preventDefault();
        });

        data.allTags(function(tags) {
            var names = [];

            for (var i = 0; i < tags.length; i++) {
                names.push(tags[i].name);
            }

            $("#transaction_tags").tagit({
                availableTags: names,
                autocomplete: {delay: 0, minLength: 2},
                singleField: true,
                allowSpaces: true
            });
        });
    }

    this.fillAccountsSelect = function () {
        data.accounts(data.accountType.receipt, true, function(accounts) {
            for (var i = 0; i < accounts.length; i++) {
                $('#from_account').append($('<option>', {value: accounts[i].id, text: accounts[i].name}));
            }
        });

        data.accounts(data.accountType.deposit, true, function(accounts) {
            for (var i = 0; i < accounts.length; i++) {
                $('#from_account').append($('<option>', {value: accounts[i].id, text: accounts[i].name}));
            }
        });

        data.accounts(data.accountType.expense, true, function(accounts) {
            for (var i = 0; i < accounts.length; i++) {
                $('#to_account').append($('<option>', {value: accounts[i].id, text: accounts[i].name}));
            }
        });

        data.accounts(data.accountType.deposit, true, function(accounts) {
            for (var i = 0; i < accounts.length; i++) {
                $('#to_account').append($('<option>', {value: accounts[i].id, text: accounts[i].name}));
            }
        });
    }

    this.update = function() {
        data.transactions(accountId, fromDate.toString("yyyy-MM-dd"), toDate.toString("yyyy-MM-dd"), function(transactions) {
            $("#transactions-list").html("");
            self.transactions = transactions;

            $.get("templates/transactions-item.html", function(html) {
                lastDate = null;

                for (var i = 0; i < transactions.length; i++) {
                     var transaction = transactions[i];
                     var item = $(html);
                     item.attr("index", i);

                     var date = Date.parse(transaction.paid_at);

                     var dateStr = date.getDate() + '\xA0' + monthNames2[date.getMonth()];
                     var weekDay = weekDaysNames[date.getDay()];

                     item.find(".transaction_date .title").text(dateStr);
                     item.find(".transaction_date .subtitle").text(weekDay);

                     if (date.equals(lastDate)) {
                         //dateStr = "";
                         //weekDay = "";
                         item.find(".transaction_date").css("visibility", "hidden");
                     }

                     lastDate = date;

                     var sign = "";

                     if (transaction.to_type_id == data.accountType.expense) {
                        sign = "−";
                     }

                     if (transaction.from_type_id == data.accountType.receipt) {
                        sign = "+";
                     }

                    if (transaction.to_type_id == data.accountType.expense || transaction.from_type_id == data.accountType.receipt) {
                        item.find(".transaction_amount").html(sign + transaction.to_account_amount.formatAmount());
                    } else {
                        item.find(".transaction_amount").html(transaction.from_account_amount.formatAmount() + "\xA0→\xA0" + transaction.to_account_amount.formatAmount());
                    }

                    if (transaction.to_type_id ==  data.accountType.expense) {
                        item.find(".transaction_from_name").html(transaction.from_account_name);
                    } else if (transaction.from_type_id == data.accountType.receipt) {
                        item.find(".transaction_from_name").html(transaction.to_account_name);
                    } else {
                        item.find(".transaction_from_name").html(transaction.from_account_name + "\xA0→\xA0" + transaction.to_account_name);
                    }

                    var name = item.find(".transaction_name");
                    name.find(".name").text(transaction.to_account_name);

                    var tags = "";

                    for (var j = 0; j < transaction.tags.length; j++) {
                        tags = tags + transaction.tags[j].name + ", ";
                    }

                    tags = tags.slice(0, -2);

                    name.find(".transaction_tags").text(tags);

                    item.find(".edit").attr("index", i);
                    item.find(".edit").click(function() {
                        self.edit(self.transactions[$(this).attr("index")]);
                    });

                    item.find(".delete").attr("index", i);
                    item.find(".delete").click(function() {
                        self.delete(self.transactions[$(this).attr("index")]);
                    });

                    $("#transactions-list").append(item);
                }

                self.filter($("#transactions-filter-text").val());
                self.updateAmount();
            });
        });
    }

    this.filter = function(text) {
        text = text.trim().toLowerCase();

        var first = true;

        $("#transactions-list").find(".transaction").each(function() {
            if (text.length == 0) {
                $(this).show();

                if (first) {
                    $(this).find(".transaction_date").css("visibility", "visible");
                    first = false;
                }
            } else {
                var name = $(this).find(".transaction_name");
                var tags = name.find(".transaction_tags").text().toLowerCase();
                var account = name.find(".name").text().toLowerCase();

                var found = false;

                if (tags.indexOf(text) != -1) {
                    found = true;
                } else if (account.indexOf(text) != -1) {
                    found = true;
                }

                if (found) {
                    $(this).show();

                    if (first) {
                        $(this).find(".transaction_date").css("visibility", "visible");
                        first = false;
                    }
                } else {
                    $(this).hide();
                }
            }
        });
    }

    this.updateAmount = function() {
        var count = 0;
        var expense = 0;
        var receipt = 0;

        $("#transactions-list").find(".transaction").each(function() {
            if (!$(this).is(":hidden")) {
                var transaction = self.transactions[$(this).attr("index")];

                if (transaction.to_type_id == 2) {
                    expense = expense + transaction.from_account_amount;
                }

                if (transaction.from_type_id == 0) {
                    receipt = receipt + transaction.to_account_amount;
                }

                count++;
            }
        });

        console.log(count);
        console.log(expense);
        console.log(receipt);
        $("#transactions-receipt").html(receipt.formatAmount());
        $("#transactions-expense").html(expense.formatAmount());
    }

    this.edit = function(transaction) {
        $("input[name=id]").val(transaction.id);
        $("input[name=mode]").val("update");
        $("input[name=submit]").val("Изменить");

        $('#to_account').val(transaction.to_account_id);
        $('#from_account').val(transaction.from_account_id);

        $("#to_amount").val(transaction.to_account_amount);
        $("#from_amount").val(transaction.from_account_amount);

        $("#transaction_tags").val("");
        $("#transaction_tags").tagit("removeAll");

        for (var i = 0; i < transaction.tags.length; i++) {
            $("#transaction_tags").tagit("createTag", transaction.tags[i].name);
        }

        $("#transaction_date").val(transaction.paid_at);

        $("#button-new-transaction").fadeOut(300, function() {
            $("#transaction-new").fadeIn(300);
        });
    }

    this.delete = function(transaction) {
        data.deleteTransaction(transaction, function(response) {
            $("#transactions-list").find(".transaction").each(function() {
                if ($(this).attr("index") == transaction.id) {
                    $(this).transaction({ "opacity": 0 }, 300, function() {
                        self.update();
                    });
                }
            });
        });
    }

    this.updateList = function () {
        $("#transactions-list").transition({ "opacity": 0 }, 300, function() {
            self.update();

            $("#transactions-list").transition({ "opacity": 1 }, 300);
        });
    }
}
