# MVC-Tech-Blog

## Description
A CMS-style blog site where developers can publish their blog posts and comment on other developers’ posts. Follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Table of Contents
- [Link](#link)
- [Video](#video)
- [Usage](#usage)
- [Development](#development)
- [Credits](#credits)

## Link

This application is deployed on Heroku. Click here to try it out.

## Screenshot

This is what the application looks like when you're on the homepage.

![AppScreenshot1](/public/images/screenshot.png?raw=true "Screenshot of Deployed Application- Homepage")

## Usage

When you visit the site for the first time, you are presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard, and the option to log in. 

When you click on the homepage option, you are taken to the homepage. When you click on any other links in the navigation, you are prompted to either sign up or sign in. If you choose to sign up, you are prompted to create a username and password. When you click on the sign-up button, your user credentials are saved and you're logged into the site. (If you idle on the site for more than 10 minutes, you're prompted to log in again before you can add, update, or delete posts. Also, revisiting the site at a later time and choosing to sign in will prompt you to enter your username and password.)

While signed in to the site, the nav bar shows links for the homepage, the dashboard, and the option to log out. Click on the homepage option in the navigation presents you with existing blog posts that include the post title, and the date created. Click on an existing blog post for the post title, contents, post creator’s username, and date created for that post. You are also given the option to leave a comment. Enter a comment and click on the submit button while signed in to save it. The post is then updated to display the comment, the comment creator’s username, and the date created.

The dashboard option in the navigation presents you with any blog posts you've already created, and the option to add a new blog post. When you click on the button to add a new blog post, you are prompted to enter its title and contents. Save it to be taken back to an updated dashboard with the new blog post there. Click on an existing post in the dashboard to reveal options to delete or update that post. If you do, that also takes you back to an updated dashboard.

Lastly, clicking on the logout option in the nav bar signs you out of the site.

## Development
In this section, I'll briefly discuss some of the challenges and successes with the project, as well as goals for the future.

By far the hardest part for me was the controllers. The models are easy enough, and I feel very confident with the handlebars views, but having the models and views interact were tough. After talking it over with one of my project partners, Lauren, I felt like a had a better grasp on the concepts. This project will be a good template to refer back to for future MVC paradigm projects.

In the future, I would consider going back and adding delete and update functions to the comments as well. Currently, they are only available for posts.

## Credits

The code featured in the second commit "starter code from my castles project for file structure and login form" was taken from the following repo: https://github.com/tcunningham203/100-famous-castles. I spent a lot of time on this project and it covers a lot of the same ground as this project. I was meant to do THIS (tech blog) project first, but I ended up doing them out of order. Because so much of the work had already been done, I decided to use the castles project as the basis for the starter code- specifically, the MVC file structure and the login screen. Then, I gradually removed and altered elements until the requirements for this project were met. Some ideas from the castle project, like applying toasts anytime a request was made to the server, were kept in but altered to fit this project.  

One of my partners for the castle project, Lauren, was able to help me with the routes for creating new posts and comments, which I was having trouble figuring out. A huge thank you to Lauren for showing me how she did it and helping me better understand the controllers folder. Her github is here: https://github.com/lnsvn

I used various learning resources like Stack Overflow and W3 schools to help with other random questions I had.


