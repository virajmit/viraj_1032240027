<?php
// DATABASE CONNECTION
$conn = new mysqli("localhost", "root", "", "studentinfo");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// INSERT
if (isset($_POST['save'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $age = $_POST['age'];

    $conn->query("INSERT INTO studentinfo (name, email, age) VALUES ('$name', '$email', '$age')");
}

// DELETE
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $conn->query("DELETE FROM studentinfo WHERE id=$id");
}

// FETCH DATA FOR EDIT
$edit = false;
$name = $email = $age = "";
$id = 0;

if (isset($_GET['edit'])) {
    $edit = true;
    $id = $_GET['edit'];
    $result = $conn->query("SELECT * FROM studentinfo WHERE id=$id");
    $row = $result->fetch_assoc();
    $name = $row['name'];
    $email = $row['email'];
    $age = $row['age'];
}

// UPDATE
if (isset($_POST['update'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $age = $_POST['age'];

    $conn->query("UPDATE studentinfo SET name='$name', email='$email', age='$age' WHERE id=$id");
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Student CRUD</title>
    <style>
        body { font-family: Arial; background:#f4f4f4; padding:20px; }
        form { background:#fff; padding:20px; width:300px; }
        table { border-collapse: collapse; margin-top:20px; background:#fff; }
        table, th, td { border:1px solid #ccc; padding:10px; }
        a { text-decoration:none; }
    </style>
</head>
<body>

<h2>Student Information</h2>

<form method="post">
    <input type="hidden" name="id" value="<?php echo $id; ?>">

    <label>Name</label><br>
    <input type="text" name="name" value="<?php echo $name; ?>" required><br><br>

    <label>Email</label><br>
    <input type="email" name="email" value="<?php echo $email; ?>" required><br><br>

    <label>Age</label><br>
    <input type="number" name="age" value="<?php echo $age; ?>" required><br><br>

    <?php if ($edit): ?>
        <button type="submit" name="update">Update</button>
    <?php else: ?>
        <button type="submit" name="save">Save</button>
    <?php endif; ?>
</form>

<table>
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Age</th>
        <th>Action</th>
    </tr>

    <?php
    $result = $conn->query("SELECT * FROM studentinfo");
    while ($row = $result->fetch_assoc()):
    ?>
    <tr>
        <td><?php echo $row['id']; ?></td>
        <td><?php echo $row['name']; ?></td>
        <td><?php echo $row['email']; ?></td>
        <td><?php echo $row['age']; ?></td>
        <td>
            <a href="index.php?edit=<?php echo $row['id']; ?>">Edit</a> |
            <a href="index.php?delete=<?php echo $row['id']; ?>" onclick="return confirm('Delete this record?')">Delete</a>
        </td>
    </tr>
    <?php endwhile; ?>
</table>

</body>
</html>
