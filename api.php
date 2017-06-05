<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

//$db = new PDO("mysql:host=127.0.0.1;dbname=clerk;charset=utf8", "mysql", "mysql");
$db = new PDO("sqlite:database.sqlite");

if ($_GET["action"] == "accounts") {
    $account = array();

    foreach ($db->query("SELECT * FROM accounts WHERE type_id = " . $_GET["type"] . " AND active = " . $_GET["active"] . " ORDER BY order_id") as $row) {
	    $account[] = array("id" => $row["id"], "name" => $row["name"], "currency_id" => $row["currency_id"], "icon_id" => $row["icon_id"], "type_id" => $row["type_id"], "credit_limit" => round($row["credit_limit"], 2));
    }

    echo json_encode($account);
}

if ($_GET["action"] == "balance") {
    $receipt = $db->query("SELECT COALESCE(SUM(to_account_amount), 0) AS sum FROM transactions WHERE to_account_id = " . $_GET["id"] . " AND deleted = 0")->fetch();
    $expense = $db->query("SELECT COALESCE(SUM(from_account_amount), 0) AS sum FROM transactions WHERE from_account_id = " . $_GET["id"] . " AND deleted = 0")->fetch();

    echo json_encode(array("balance" => round($receipt["sum"] - $expense["sum"], 2), "receipt" => round($receipt["sum"], 2), "expense" => round($expense["sum"], 2) ));
}

if ($_GET["action"] == "budget") {
    $receipt = $db->query("SELECT COALESCE(SUM(t.to_account_amount), 0) AS sum FROM accounts a, transactions t WHERE a.type_id = 0 AND t.from_account_id = a.id AND t.deleted = 0 AND t.paid_at >= '" . $_GET["from"] . "' AND t.paid_at <= '" . $_GET["to"] . "'")->fetch();
    $expense = $db->query("SELECT COALESCE(SUM(t.from_account_amount), 0) AS sum FROM accounts a, transactions t WHERE a.type_id = 2 AND t.to_account_id = a.id AND t.deleted = 0 AND t.paid_at >= '" . $_GET["from"] . "' AND t.paid_at <= '" . $_GET["to"] . "'")->fetch();

    echo json_encode(array("receipt" => round($receipt["sum"], 2), "expense" => round($expense["sum"], 2)));
}

if ($_GET["action"] == "expenses") {
    $expenses = array();

    foreach ($db->query("SELECT a.id, a.name, SUM(t.from_account_amount) AS sum FROM accounts a, transactions t WHERE a.type_id = 2 AND t.to_account_id = a.id AND t.deleted = 0 AND t.paid_at >= '" . $_GET["from"] . "' AND t.paid_at <= '" . $_GET["to"] . "' GROUP BY t.to_account_id ORDER BY sum DESC LIMIT 5") as $row) {
        $expenses[] = array("id" => $row["id"], "name" => $row["name"], "sum" => round($row["sum"], 2));
    }

    echo json_encode($expenses);
}

if ($_GET["action"] == "expenses_by_date") {
    $expenses = array();

    if ($_GET["account"] == -1) {
        foreach ($db->query("SELECT a.name AS name, SUM(t.from_account_amount) AS sum FROM accounts a, transactions t WHERE a.type_id = 2 AND t.to_account_id = a.id AND t.deleted = 0 AND t.paid_at >= '" . $_GET["from"] . "' AND t.paid_at <= '" . $_GET["to"] . "' GROUP BY t.to_account_id ORDER BY sum DESC") as $row) {
            $expenses[] = array("name" => $row["name"], "sum" => round($row["sum"], 2));
        }
    } else {
        foreach ($db->query("SELECT tg.name AS name, SUM(t.from_account_amount) AS sum FROM transactions t, transactions_tags tt, tags tg WHERE t.to_account_id = " . $_GET["account"] . " AND t.deleted = 0 AND tt.transaction_id = t.id AND tg.id = tt.tag_id AND t.paid_at >= '" . $_GET["from"] . "' AND t.paid_at <= '" . $_GET["to"] . "' GROUP BY tg.name ORDER BY sum DESC") as $row) {
            $expenses[] = array("name" => $row["name"], "sum" => round($row["sum"], 2));
        }
    }

    echo json_encode($expenses);
}

if ($_GET["action"] == "expenses_by_month") {
	$expenses = array();

    if ($_GET["account"] == -1) {
	    foreach ($db->query("SELECT strftime('%Y %m', t.paid_at) AS date, TOTAL(t.from_account_amount) AS amount FROM transactions t, accounts a WHERE t.deleted = 0 AND t.to_account_id = a.id AND a.type_id = 2 AND t.paid_at >= '" . $_GET["from"] . "' AND t.paid_at <= '" . $_GET["to"] . "' GROUP BY strftime('%Y %m', t.paid_at) ORDER BY t.paid_at") as $row) {
	           $expenses[] = array("date" => $row["date"], "value" => round($row["amount"], 2));
	    }
    } else {
        foreach ($db->query("SELECT strftime('%Y %m', t.paid_at) AS date, TOTAL(t.from_account_amount) AS amount FROM transactions t, accounts a WHERE t.to_account_id = " . $_GET["account"] . " AND t.deleted = 0 AND t.to_account_id = a.id AND a.type_id = 2 AND t.paid_at >= '" . $_GET["from"] . "' AND t.paid_at <= '" . $_GET["to"] . "' GROUP BY strftime('%Y %m', t.paid_at) ORDER BY t.paid_at") as $row) {
	           $expenses[] = array("date" => $row["date"], "value" => round($row["amount"], 2));
	    }
    }

	echo json_encode($expenses);
}

if ($_GET["action"] == "expenses_by_account") {
    $expenses = array();

    if ($_GET["account"] == -1) {
        foreach ($db->query("SELECT a.name AS name, SUM(t.from_account_amount) AS sum FROM accounts a, transactions t WHERE a.type_id = 2 AND t.to_account_id = a.id AND t.deleted = 0 AND t.paid_at >= '" . $_GET["from"] . "' AND t.paid_at <= '" . $_GET["to"] . "' GROUP BY t.to_account_id ORDER BY sum DESC") as $row) {
            $expenses[] = array("name" => $row["name"], "sum" => round($row["sum"], 2));
        }
    } else {
        $result = $db->query("SELECT SUM(t.from_account_amount) AS sum FROM transactions t WHERE t.to_account_id = " . $_GET["account"] . " AND t.deleted = 0 AND t.paid_at >= '" . $_GET["from"] . "' AND t.paid_at <= '" . $_GET["to"] . "'")->fetch();
        $expenses = array("sum" => round($result["sum"], 2));
    }

    echo json_encode($expenses);
}

if ($_GET["action"] == "last_transactions") {
    $transactions = array();

    foreach ($db->query("SELECT a1.name AS from_account_name, a1.type_id AS from_type_id, a2.name AS to_account_name, a2.type_id AS to_type_id, t.* FROM transactions t, accounts a1, accounts a2
                            WHERE t.deleted = 0 AND a1.id = t.from_account_id AND a2.id = t.to_account_id ORDER BY t.paid_at DESC, t.created_at DESC LIMIT " . $_GET["from"] . "," .$_GET["to"]) as $row) {
        $tags = array();

        foreach ($db->query("SELECT t.name FROM transactions_tags tt, tags t WHERE tt.transaction_id = " . $row["id"] . " AND t.id = tt.tag_id") as $row2) {
            $tags[] = array("name" => $row2["name"]);
        }

        $transactions[] = array("id" => $row["id"], "paid_at" => $row["paid_at"], "from_account_name" => $row["from_account_name"], "from_type_id" => $row["from_type_id"],
                                "to_account_name" => $row["to_account_name"], "to_type_id" => $row["to_type_id"],
                                "to_account_amount" => round($row["to_account_amount"], 2), "from_account_amount" => round($row["from_account_amount"], 2), "tags" => $tags);
    }

    echo json_encode($transactions);
}

if ($_GET["action"] == "transactions") {
    $transactions = array();
    $accounts = "";

    if (isset($_GET["id"])) {
        $accounts = " AND (t.from_account_id = " . $_GET["id"] . " OR t.to_account_id = " .  $_GET["id"] . ")";
    }

    foreach ($db->query("SELECT a1.name AS from_account_name, a1.id AS from_account_id, a1.type_id AS from_type_id, a2.name AS to_account_name, a2.id AS to_account_id, a2.type_id AS to_type_id, t.* FROM transactions t, accounts a1, accounts a2
                            WHERE t.deleted = 0 AND a1.id = t.from_account_id AND a2.id = t.to_account_id AND
                            t.paid_at >= '" . $_GET["from"] . "' AND t.paid_at <= '" . $_GET["to"] . "'" . $accounts . " ORDER BY t.paid_at DESC, t.created_at DESC") as $row) {
        $tags = array();

        foreach ($db->query("SELECT t.name FROM transactions_tags tt, tags t WHERE tt.transaction_id = " . $row["id"] . " AND t.id = tt.tag_id") as $row2) {
            $tags[] = array("name" => $row2["name"]);
        }

        $transactions[] = array("id" => $row["id"], "paid_at" => $row["paid_at"], "from_account_name" => $row["from_account_name"], "from_account_id" => $row["from_account_id"], "from_type_id" => $row["from_type_id"],
                                "to_account_name" => $row["to_account_name"], "to_account_id" => $row["to_account_id"], "to_type_id" => $row["to_type_id"],
                                "to_account_amount" => round($row["to_account_amount"], 2), "from_account_amount" => round($row["from_account_amount"], 2), "tags" => $tags, "note" => $row["note"]);
    }

    echo json_encode($transactions);
}

if ($_GET["action"] == "tags") {
	$tags = array();

	foreach ($db->query("SELECT t.name FROM transactions_tags tt, tags t WHERE tt.transaction_id = " . $_GET["id"] . " AND t.id = tt.tag_id") as $row) {
        $tags[] = array("name" => $row["name"]);
    }

    echo json_encode($tags);
}

if ($_GET["action"] == "transaction") {
    if ($_GET["mode"] == "insert") {
        $error = false;
        $statement = $db->prepare("INSERT INTO transactions (paid_at, from_account_id, to_account_id, from_account_amount, to_account_amount, note, created_at, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

        if (isset($_GET['note'])) {
            $note = $_GET['note'];
        } else {
            $note = "";
        }

        $date = date("Y-m-d H:i:s");

        if ($statement->execute(array($_GET['date'], $_GET['from_account'], $_GET['to_account'], $_GET['from_amount'], $_GET['to_amount'], $note, $date, 0))) {
            $transaction_id = $db->lastInsertId();
            $tags = explode(",", $_GET['tags']);

            foreach ($tags as $tag) {
                $tag_id = -1;
                $result = $db->query("SELECT id FROM tags WHERE name = '" . trim($tag) . "'")->fetch();

                if (!empty($result)) {
                    $tag_id = $result["id"];
                }

                if ($tag_id == -1) {
                    $statement = $db->prepare("INSERT INTO tags (name) VALUES (?)");

                    if ($statement->execute(array(trim($tag)))) {
                        $tag_id = $db->lastInsertId();
                    }
                }

                $statement = $db->prepare("INSERT INTO transactions_tags (tag_id, transaction_id) VALUES (?, ?)");

                if (!$statement->execute(array($tag_id, $transaction_id))) {
                    $error = true;
                }
            }
        } else {
            $error = true;
        }

        echo json_encode(array("error" => $error, "id" => $transaction_id, "info" => $db->errorInfo()));
    } else if ($_GET["mode"] == "update") {
        $error = false;
        $statement = $db->prepare("UPDATE transactions SET paid_at = ?, from_account_id = ?, to_account_id = ?, from_account_amount = ?, to_account_amount = ?, note = ? WHERE id = ?");

        if (isset($_GET['note'])) {
            $note = $_GET['note'];
        } else {
            $note = "";
        }

        $transaction_id = $_GET['id'];

        if ($statement->execute(array($_GET['date'], $_GET['from_account'], $_GET['to_account'], $_GET['from_amount'], $_GET['to_amount'], $note, $transaction_id))) {
            $statement = $db->prepare("DELETE FROM transactions_tags WHERE transaction_id = ?");

            if (!$statement->execute(array($transaction_id))) {
                $error = true;
            }

            $tags = explode(",", $_GET['tags']);

            foreach ($tags as $tag) {
                $tag_id = -1;
                $result = $db->query("SELECT id FROM tags WHERE name = '" . trim($tag) . "'")->fetch();

                if (!empty($result)) {
                    $tag_id = $result["id"];
                }

                if ($tag_id == -1) {
                    $statement = $db->prepare("INSERT INTO tags (name) VALUES (?)");

                    if ($statement->execute(array(trim($tag)))) {
                        $tag_id = $db->lastInsertId();
                    }
                }

                $statement = $db->prepare("INSERT INTO transactions_tags (tag_id, transaction_id) VALUES (?, ?)");

                if (!$statement->execute(array($tag_id, $transaction_id))) {
                    $error = true;
                }
            }
        } else {
            $error = true;
        }

        echo json_encode(array("error" => $error, "id" => $transaction_id, "info" => $db->errorInfo()));
    } else if ($_GET["mode"] == "get") {
        $row = $db->query("SELECT a1.name AS from_account_name, a1.type_id AS from_type_id, a2.name AS to_account_name, a2.type_id AS to_type_id, t.* FROM transactions t, accounts a1, accounts a2 WHERE t.id = " . $_GET["id"] . " AND a1.id = t.from_account_id AND a2.id = t.to_account_id ORDER BY paid_at DESC, created_at DESC")->fetch();

        $tags = array();

        foreach ($db->query("SELECT t.name FROM transactions_tags tt, tags t WHERE tt.transaction_id = " . $row["id"] . " AND t.id = tt.tag_id") as $row2) {
            $tags[] = array("name" => $row2["name"]);
        }

        $result = array("id" => $row["id"], "paid_at" => $row["paid_at"], "from_account_name" => $row["from_account_name"], "from_type_id" => $row["from_type_id"],
                        "to_account_name" => $row["to_account_name"], "to_type_id" => $row["to_type_id"],
                        "to_account_amount" => round($row["to_account_amount"], 2), "from_account_amount" => round($row["from_account_amount"], 2), "tags" => $tags);

        echo json_encode($result);
    } else if ($_GET["mode"] == "delete") {
        $statement = $db->prepare("UPDATE transactions SET deleted = ? WHERE id = ?");

        if ($statement->execute(array(1, $_GET['id']))) {
        } else {
            $error = true;
        }

        echo json_encode(array("error" => $error, "id" => $_GET['id'], "info" => $db->errorInfo()));
    } else if ($_GET["mode"] == "split") {
        $error = false;
        $statement = $db->prepare("UPDATE transactions SET from_account_amount = ?, to_account_amount = ? WHERE id = ?");

        $transaction_id = $_GET['id'];

        if (!$statement->execute(array($_GET['from_amount'], $_GET['to_amount'], $transaction_id))) {
            $error = true;
        }

        echo json_encode(array("error" => $error, "id" => $transaction_id, "info" => $db->errorInfo()));
    }
}

if ($_GET["action"] == "rate") {
    $db->query("SELECT t.paid_at, t.from_account_amount, t.to_account_amount, a.currency_id, a2.currency_id FROM transactions t, accounts a, accounts a2 \
				   WHERE t.from_account_id = a.id AND a.currency_id = " . $_GET["from"] . " AND t.to_account_id = a2.id AND a2.currency_id = " . $_GET["to"] . " AND t.paid_at <= '" . $_GET["date"] . "' \
				   ORDER BY t.paid_at DESC LIMIT 1")->fetch();
}

if ($_GET["action"] == "all_tags") {
	$tags = array();

	foreach ($db->query("SELECT DISTINCT(TRIM(t.name)) as name FROM tags t") as $row) {
        $tags[] = array("name" => $row["name"]);
    }

    echo json_encode($tags);
}

if ($_GET["action"] == "available_amounts") {
    $result = array();

    foreach ($db->query("SELECT a.*, c.short_name AS currency_name FROM accounts a, currencies c WHERE a.type_id = 1 AND a.active = 1 AND a.currency_id = c.id") as $row) {
        $receipt = $db->query("SELECT COALESCE(SUM(to_account_amount), 0) AS sum FROM transactions WHERE to_account_id = " . $row["id"] . " AND deleted = 0")->fetch();
        $expense = $db->query("SELECT COALESCE(SUM(from_account_amount), 0) AS sum FROM transactions WHERE from_account_id = " . $row["id"] . " AND deleted = 0")->fetch();

  	    $account = array("id" => $row["id"], "name" => $row["name"], "currency_id" => $row["currency_id"], "currency_name" => $row["currency_name"],
                         "credit_limit" => round($row["credit_limit"], 2), "receipt" => $receipt, "expense" => $expense, "balance" => round($receipt["sum"] - $expense["sum"], 2));

        $result[] = $account;
    }

    echo json_encode($result);
}

if ($_GET["action"] == "account") {
    if ($_GET["mode"] == "insert") {
    } else if ($_GET["mode"] == "update") {
        $error = false;
        $statement = $db->prepare("UPDATE accounts SET name = ?, note = ?, credit_limit = ?, currency_id = ? WHERE id = ?");

        if (isset($_GET['note'])) {
            $note = $_GET['note'];
        } else {
            $note = "";
        }

        if (isset($_GET['credit_limit'])) {
            $credit_limit = $_GET['credit_limit'];
        } else {
            $credit_limit = 0;
        }

        $account_id = $_GET['id'];

        if (!$statement->execute(array($_GET['name'], $note, $credit_limit, $_GET['currency'], $account_id))) {
            $error = true;
        }

        echo json_encode(array("error" => $error, "id" => $account_id, "info" => $db->errorInfo()));
    } else if ($_GET["mode"] == "delete") {
        $error = false;
        $statement = $db->prepare("UPDATE accounts SET active = ? WHERE id = ?");

        $account_id = $_GET['id'];

        if (!$statement->execute(array(0, $account_id))) {
            $error = true;
        }

        echo json_encode(array("error" => $error, "id" => $account_id, "info" => $db->errorInfo()));
    }
}

if ($_GET["action"] == "currencies") {
    $currencies = array();

    foreach ($db->query("SELECT * FROM currencies ORDER BY name") as $row) {
	    $currencies[] = array("id" => $row["id"], "name" => $row["name"]);
    }

    echo json_encode($currencies);
}

if ($_GET["action"] == "budgets") {
    $budgets = array();

    foreach ($db->query("SELECT * FROM budgets ORDER BY name") as $row) {
	    $budgets[] = array("id" => $row["id"], "name" => $row["name"], "amount" => round($row["amount"], 2), "period" => $row["period"], "type" => $row["type"], "account_id" => $row["account_id"]);
    }

    echo json_encode($budgets);
}

?>
