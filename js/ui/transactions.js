function Transactions() {
    var self = this;

    this.view;
    this.fromDate = Date.today();
    this.toDate = Date.today();
    this.accountId;
    this.settings = window['localStorage'];
    this.datePicker;
    this.transactions = [];
    this.periodType = { custom: 0, week: 1, month: 2, prevMonth: 3 };
    this.selectedPeriod;

    this.load = function(container) {
        $.get("templates/transactions.html", function(html) {
            view = $(html);
            container.append(view);

            $("#filter_period").css("opacity", 0);
            $("#filter_period").hide();

            $("#transactions_filter_period").click(function() {
                self.selectPeriod($(this), self.periodType.custom);
            });

            $("#transactions_filter_week").click(function() {
                self.selectPeriod($(this), self.periodType.week);
            });

            $("#transactions_filter_month").click(function() {
                self.selectPeriod($(this), self.periodType.month);
            });

            $("#transactions_filter_prev_month").click(function() {
                self.selectPeriod($(this), self.periodType.prevMonth);
            });

            var defaultDate = Date.today();

            if (self.settings["from_date_filter"]) {
                defaultDate = Date.parse(self.settings["from_date_filter"]);
            }

            $("#from_date").pikaday({
                firstDay: 1,
                defaultDate: defaultDate,
                onSelect: function () {
                    self.fromDate = new Date(this.getDate());

                    $("#from_date").val(self.fromDate.toString("yyyy-MM-dd"));
                    self.settings["from_date_filter"] = self.fromDate.toString("yyyy-MM-dd");

                    self.updateList();
                }
            });

            defaultDate = Date.today();

            if (self.settings['to_date_filter']) {
                defaultDate = Date.parse(self.settings['to_date_filter']);
            }

            $("#to_date").pikaday({
                firstDay: 1,
                defaultDate: defaultDate,
                onSelect: function () {
                    self.toDate = new Date(this.getDate());

                    $("#to_date").val(self.toDate.toString("yyyy-MM-dd"));
                    self.settings['to_date_filter'] = self.toDate.toString("yyyy-MM-dd");

                    self.updateList();
                }
            });

            $("#from_date").val(self.fromDate.toString("yyyy-MM-dd"));

            if (self.settings['from_date_filter']) {
                $("#from_date").val(self.settings['from_date_filter']);
            }

            $("#to_date").val(self.toDate.toString("yyyy-MM-dd"));

            if (self.settings['to_date_filter']) {
                $("#to_date").val(self.settings['to_date_filter']);
            }

            $("#transactions_filter_text").keyup(function() {
                self.filter();
                self.updateAmount();
            });

            if (self.settings["selectedPeriod"]) {
                if (self.settings["selectedPeriod"] == self.periodType.week) {
                    $("#transactions_filter_week").click();    
                } else if (self.settings["selectedPeriod"] == self.periodType.month) {
                    $("#transactions_filter_month").click();
                } else if (self.settings["selectedPeriod"] == self.periodType.prevMonth) {
                    $("#transactions_filter_prev_month").click();
                } else {
                    $("#transactions_filter_period").click();    
                }
            } else {
                $("#transactions_filter_week").click();
            }

            self.initForm();
        });
    }

    this.initForm = function() {
        self.fillAccountsSelect();

        $("#button_new_transaction").click(function () {
            self.newTransaction();
        });

        $("#transaction_form_button_cancel").click(function() {
            $("#transaction_new").transition({ "opacity": 0 }, 300, function() {
                $(this).hide();

                $("#button_new_transaction").transition({ "opacity": 1 }, 300, function() {

                });
            });
        });

        $("#transaction_form_button_ok").click(function(e) {
            e.preventDefault();

            self.save();
        });

        $("#transaction_from_amount").focusout(function() {
            var newValue = $("#transaction_from_amount").val();

            newValue = newValue.clearAmount();
            newValue = eval(newValue).toFixed(2);

            if ($("#transaction_to_amount").val() == "") {
                $("#transaction_to_amount").val(newValue);
            }
        });

        self.datePicker = new Pikaday({
            field: $("#transaction_form_date")[0],
            firstDay: 1,
            defaultDate: new Date(),
            format: 'yyyy-MM-dd',
            onSelect: function () {
                var date = new Date(this.getDate());
                $("#transaction_form_date").val(date.toString("yyyy-MM-dd"));
            }
        });

        self.datePicker.setDate(Date.today().toString("yyyy-MM-dd"));        

        data.allTags(function(tags) {
            var names = [];

            for (var i = 0; i < tags.length; i++) {
                names.push(tags[i].name);
            }

            $("#transaction_form_tags").tagit({
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
                $('#transaction_from_account').append($('<option>', {value: accounts[i].id, text: accounts[i].name}));
            }
        });

        data.accounts(data.accountType.deposit, true, function(accounts) {
            for (var i = 0; i < accounts.length; i++) {
                $('#transaction_from_account').append($('<option>', {value: accounts[i].id, text: accounts[i].name}));
            }
        });

        data.accounts(data.accountType.expense, true, function(accounts) {
            for (var i = 0; i < accounts.length; i++) {
                $('#transaction_to_account').append($('<option>', {value: accounts[i].id, text: accounts[i].name}));
            }
        });

        data.accounts(data.accountType.deposit, true, function(accounts) {
            for (var i = 0; i < accounts.length; i++) {
                $('#transaction_to_account').append($('<option>', {value: accounts[i].id, text: accounts[i].name}));
            }
        });

        data.accounts(data.accountType.debt, true, function(accounts) {
            for (var i = 0; i < accounts.length; i++) {
                $('#transaction_to_account').append($('<option>', {value: accounts[i].id, text: accounts[i].name}));
            }
        });
    }

    this.update = function(callback) {
        data.transactions(self.accountId, self.fromDate.toString("yyyy-MM-dd"), self.toDate.toString("yyyy-MM-dd"), function(transactions) {
            self.transactions = transactions;

            self.filter();
            self.updateAmount();

            if (callback) {
                callback();
            }
        });
    }

    this.filter = function() {
        var text = $("#transactions_filter_text").val().trim().toLowerCase();

        $("#transactions_list").html("");

        $.get("templates/transactions-item.html", function(html) {
            lastDate = null;

            for (var i = 0; i < self.transactions.length; i++) {
                var transaction = self.transactions[i];

                var tags = "";

                for (var j = 0; j < transaction.tags.length; j++) {
                    tags = tags + transaction.tags[j].name + ", ";
                }

                tags = tags.slice(0, -2);

                if (text.length > 0) {
                    var account = transaction.to_account_name.toLowerCase();

                    var found = false;

                    if (tags.toLowerCase().indexOf(text) != -1) {
                        found = true;
                    } else if (account.indexOf(text) != -1) {
                        found = true;
                    }

                    if (!found) {
                        continue;
                    }
                }

                var item = $(html);
                item.attr("index", i);

                var date = Date.parse(transaction.paid_at);

                var dateStr = date.getDate() + '\xA0' + monthNames2[date.getMonth()];
                var weekDay = weekDaysNames[date.getDay()];

                item.find(".transaction_date .title").text(dateStr);
                item.find(".transaction_date .subtitle").text(weekDay);

                if (date.equals(lastDate)) {
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

                name.find(".transaction_tags").text(tags);

                if (transaction.note && transaction.note.length > 0) {
                    name.find(".transaction_note").text("(" + transaction.note + ")");
                }

                var editButton = item.find(".edit");

                editButton.attr("index", i);
                editButton.click(function() {
                    self.edit(self.transactions[$(this).attr("index")]);
                });

                var deleteButton = item.find(".delete");

                deleteButton.attr("index", i);
                deleteButton.click(function() {
                    self.delete(self.transactions[$(this).attr("index")]);
                });

                var splitButton = item.find(".split");

                splitButton.attr("index", i);
                splitButton.click(function() {
                    self.split(self.transactions[$(this).attr("index")]);
                });
                
                splitButton.hide();

                if (transaction.from_type_id == data.accountType.receipt || transaction.to_type_id == data.accountType.expense) {
                    splitButton.show();
                }

                var copyButton = item.find(".copy");

                copyButton.attr("index", i);
                copyButton.click(function() {
                    self.copy(self.transactions[$(this).attr("index")]);
                });                

                $("#transactions_list").append(item);
            }
        });
    }

    this.updateAmount = function() {
        var expense = 0;
        var receipt = 0;

        self.transactions.forEach(function(transaction) {
            if (transaction.to_type_id == data.accountType.expense) {
                expense = expense + transaction.from_account_amount;
            }

            if (transaction.from_type_id == data.accountType.receipt) {
                receipt = receipt + transaction.to_account_amount;
            }
        });

        $("#transactions_receipt").html(receipt.formatAmount());
        $("#transactions_expense").html(expense.formatAmount());
    }

    this.save = function() {
        var callback = function(transaction) {
            $("#transaction_new").transition({ "opacity": 0 }, 300, function() {
                $(this).hide();

                $("#button_new_transaction").transition({ "opacity": 1 }, 300, function() {
                    var date = Date.parse(transaction.date);
                    
                    if (date.between(self.fromDate, self.toDate)) {
                        self.updateList();
                    } else {
                        var today = Date.today();

                        var fromDate = today.moveToFirstDayOfMonth();
                        var toDate = today.moveToLastDayOfMonth();

                        if (date.between(fromDate, toDate)) {
                            self.selectPeriod($("#transactions_filter_month"), self.periodType.month);
                        } else {
                            today = Date.today().addMonths(-1);

                            fromDate = today.moveToFirstDayOfMonth();
                            toDate = today.moveToLastDayOfMonth();

                            if (date.between(fromDate, toDate)) {
                                self.selectPeriod($("#transactions_filter_prev_month"), self.periodType.prevMonth);
                            } else {
                                self.fromDate = new Date(date).add().days(-7);
                                self.toDate = new Date(date);

                                $("#from_date").val(self.fromDate.toString("yyyy-MM-dd"));
                                self.settings["from_date_filter"] = self.fromDate.toString("yyyy-MM-dd");

                                $("#to_date").val(self.toDate.toString("yyyy-MM-dd"));
                                self.settings['to_date_filter'] = self.toDate.toString("yyyy-MM-dd");

                                self.selectPeriod($("#transactions_filter_period"), self.periodType.custom);
                            }
                        }
                    }                    
                });
            });
        }

        var fromAmount = parseFloat(eval($("#transaction_from_amount").val().clearAmount()));
        var toAmount = parseFloat($("#transaction_to_amount").val().clearAmount());

        if (fromAmount == 0) {
            return;
        }

        if (toAmount == 0) {
            return;
        }

        var transaction = {};

        transaction.id = $("input[name=id]").val();
        transaction.from_account = $("#transaction_from_account").val();
        transaction.to_account = $("#transaction_to_account").val();
        transaction.from_amount = fromAmount;
        transaction.to_amount = toAmount;
        transaction.date = $("#transaction_form_date").val();
        transaction.tags = $("#transaction_form_tags").val();
        transaction.note = $("#transaction_note").val();

        data.saveTransaction(transaction, $("input[name=mode]").val(), function(response) {
            if (!response.error) {
                var transaction = self.transactionById($("input[name=from_id]").val());

                if (transaction) {
                    transaction.from_account_amount = transaction.from_account_amount - fromAmount;
                    transaction.to_account_amount = transaction.to_account_amount - toAmount;

                    data.splitTransaction(transaction, function(response) {
                        callback(transaction);
                    });
                } else {
                    callback(transaction);
                }
            }
        });
    }

    this.newTransaction = function() {
        var date = new Date(datePicker.getDate());

        $("input[name=id]").val("-1");
        $("input[name=from_id]").val("");
        $("input[name=mode]").val("insert");

        $("#transaction_to_amount").val("");
        $("#transaction_from_amount").val("");
        $("#transaction_form_tags").val("");
        $("#transaction_form_tags").tagit("removeAll");
        $("#transaction_form_date").val(date.toString("yyyy-MM-dd"));

        $("#transaction_form_button_ok").find("span").text("Добавить");

        $("#button_new_transaction").transition({ "opacity": 0 }, 300, function() {
            $("#transaction_new").show();
            $("#transaction_new").transition({ "opacity": 1 }, 300);
        });
    }

    this.edit = function(transaction) {
        $("input[name=id]").val(transaction.id);
        $("input[name=from_id]").val("");
        $("input[name=mode]").val("update");

        $('#transaction_to_account').val(transaction.to_account_id);
        $('#transaction_from_account').val(transaction.from_account_id);

        $("#transaction_to_amount").val(transaction.to_account_amount);
        $("#transaction_from_amount").val(transaction.from_account_amount);

        $("#transaction_form_tags").val("");
        $("#transaction_form_tags").tagit("removeAll");

        for (var i = 0; i < transaction.tags.length; i++) {
            $("#transaction_form_tags").tagit("createTag", transaction.tags[i].name);
        }

        $("#transaction_form_date").val(transaction.paid_at);
        $("#transaction_note").val(transaction.note);

        $("#transaction_form_button_ok").find("span").text("Изменить");

        $("#button_new_transaction").transition({ "opacity": 0 }, 300, function() {
            $("#transaction_new").show();
            $("#transaction_new").transition({ "opacity": 1 }, 300);
        });
    }

    this.delete = function(transaction) {
        data.deleteTransaction(transaction, function(response) {
            self.updateList();
        });
    }

    this.split = function(transaction) {
        $("input[name=id]").val("-1");
        $("input[name=from_id]").val(transaction.id);
        $("input[name=mode]").val("insert");

        $("#transaction_to_account").val(transaction.to_account_id);
        $("#transaction_from_account").val(transaction.from_account_id);

        $("#transaction_from_amount").val("");
        $("#transaction_to_amount").val("");

        $("#transaction_form_tags").val("");
        $("#transaction_form_tags").tagit("removeAll");

        $("#transaction_form_date").val(transaction.paid_at);
        $("#transaction_note").val("");

        $("#transaction_form_button_ok").find("span").text("Разбить");

        $("#button_new_transaction").transition({ "opacity": 0 }, 300, function() {
            $("#transaction_new").show();
            $("#transaction_new").transition({ "opacity": 1 }, 300);
        });
    }

    this.copy = function(transaction) {
        var date = new Date();

        $("input[name=id]").val("-1");
        $("input[name=from_id]").val("");
        $("input[name=mode]").val("insert");

        $("#transaction_to_account").val(transaction.to_account_id);
        $("#transaction_from_account").val(transaction.from_account_id);

        $("#transaction_to_amount").val(transaction.to_account_amount);
        $("#transaction_from_amount").val(transaction.from_account_amount);

        $("#transaction_form_tags").val("");
        $("#transaction_form_tags").tagit("removeAll");

        for (var i = 0; i < transaction.tags.length; i++) {
            $("#transaction_form_tags").tagit("createTag", transaction.tags[i].name);
        }

        $("#transaction_form_date").val(date.toString("yyyy-MM-dd"));
        $("#transaction_note").val(transaction.note);

        $("#transaction_form_button_ok").find("span").text("Сохранить");

        $("#button_new_transaction").transition({ "opacity": 0 }, 300, function() {
            $("#transaction_new").show();
            $("#transaction_new").transition({ "opacity": 1 }, 300);
        });
    }

    this.updateList = function () {
        $("#transactions_list").transition({ "opacity": 0 }, 300, function() {
            self.update(function() {
                $("#transactions_list").transition({ "opacity": 1 }, 300);
            });
        });
    }

    this.selectPeriod = function(sender, type) {
        if (sender.hasClass("active")) {
            return;
        }

        self.selectedPeriod = type;
        self.settings["selectedPeriod"] = self.selectedPeriod;

        $("#transactions_filter").find(".button").removeClass("active");
        sender.addClass("active");

        if (type == self.periodType.custom) {
            $("#filter_period").show();
            $("#filter_period").transition({"opacity": 1}, 300);

            if (self.settings['from_date_filter']) {
                self.fromDate = Date.parse(self.settings['from_date_filter']);
            }

            if (self.settings['to_date_filter']) {
                self.toDate = Date.parse(self.settings['to_date_filter']);
            }
        } else if (type == self.periodType.week) {
            $("#filter_period").transition({"opacity": 0}, 300);

            self.fromDate = Date.today().previous().monday();
            self.toDate = new Date(self.fromDate).moveToDayOfWeek(7);
        } else if (type == self.periodType.month) {
            $("#filter_period").transition({"opacity": 0}, 300);

            self.fromDate = Date.today().moveToFirstDayOfMonth();
            self.toDate = Date.today().moveToLastDayOfMonth();
        } else if (type == self.periodType.prevMonth) {
            $("#filter_period").transition({"opacity": 0}, 300);

            var date = Date.today().addMonths(-1);

            self.fromDate = date.moveToFirstDayOfMonth();
            self.toDate = date.moveToLastDayOfMonth();
        }

        self.updateList();
    }

    this.transactionById = function(id) {
        for (var i = 0; i < self.transactions.length; i++) {
            if (self.transactions[i].id == id) {
                return self.transactions[i];
            }
        }

        return null;
    }
}
