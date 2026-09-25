# COLORS LAMP application

COLORS is a web application that allows a user to signs in, add color names, searches their saved colors, and logs out. 

## Live Web Aplication

[Open the COLORS application](http://cop4331c.space/index.html). Sign in with an existing lab account to add and search colors.

## Technologies

- Linux and Apache 
- PHP 8.3 with the MySQLi extension and mysqlnd 
- MySQL
- HTML, CSS, and vanilla JavaScript with XMLHttpRequest

## Repository layout

```text
LAMPAPI/
  database.php       Connection helper
  Login.php          Account lookup
  AddColor.php       Save a color for a user
  SearchColors.php   Search a user's colors
css/styles.css
js/code.js
js/md5.js
images/background.png
index.html           Login page
color.html           Color management page
database/schema.sql  Schema only, without user data
.gitignore
README.md
LICENSE.md
```

## Setup

1. Install Apache, PHP with MySQLi/mysqlnd, and MySQL on a Linux machine.

2. Clone this repository into your directory. Configure Apache to serve that directory, with `index.html` as an index page. Keep Git metadata outside the document root or explicitly deny web access to it.

3. Create a new MySQL database and a dedicated application database user. Give that user SELECT access to Users and SELECT/INSERT access to Colors. Import the empty schema into the new database, for example:

   ```bash
   mysql -u YOUR_ADMIN_USER -p YOUR_DATABASE < database/schema.sql
   ```

   Do not import this schema over an existing lab database. It contains no accounts or deployed records.

4. Create `config.php` in the **parent directory of the application directory**. Its contents are a PHP array in this order (replace all placeholders locally):

   ```php
   <?php
   return ['localhost', 'YOUR_DB_USER', 'YOUR_DB_PASSWORD', 'YOUR_DATABASE'];
   ```

### 5. Create a Lab Account

Create a test account directly in the `Users` table using a database tool. Enter a first name, last name, username, and password. The ID will be created automatically.

There is no registration page. Use a test password that is not used for any real account, and do not commit account information to GitHub.

### 6. Run the Application

Start Apache and MySQL, then open `index.html` through your configured website. Log in, add a color, search for part of its name, and use **Log Out** to return to the login page.

The frontend uses the `LAMPAPI` folder for its API requests, so the frontend and backend need to be served together.

For local testing, run this from the project folder:

```bash
php -S 127.0.0.1:8000 -t .
