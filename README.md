[comment]: <> (![Zoo Manager]&#40;https://i.ibb.co/rtxbGps/coollogo-com-1544035.png&#41;)
<p align="center">
    <img src="https://i.ibb.co/rtxbGps/coollogo-com-1544035.png" alt="Zoo Manager" />
</p>

[comment]: <> ([![GPLv3 License][license-src]][license-href])

## Table of Contents
[comment]: <> (***)

> * [General Info](#general-info)
> * [Technologies](#technologies)
> * [Installation](#installation)
> * [Contributors](#contributors)

[comment]: <> (> * [Collaboration]&#40;#collaboration&#41;)

[comment]: <> (> * [FAQs]&#40;#faqs&#41;)


## General Info
[comment]: <> (***)

The objective is to create a zoo management via API.
For this we need to be able to manage more things in the zoo.
* Management of spaces
* Management of employees
* Management of the maintenance of spaces
* Management of tickets in the zoo
* Management of PASS (Day PASS, Weekend PASS, Annual PASS, 1daymonth PASS)

Once all this is managed, we must have the possibility to have different activities.
The PASS are created for this part.

## Technologies
[comment]: <> (***)

A list of technologies used within the project:
* [NodeJs](https://nodejs.org/en/download/): Version 14.16.0
* [Git](https://git-scm.com/downloads): Version 2.31.1
* [npm](https://www.npmjs.com/): Version 7.8.0
* [bcrypt](https://www.npmjs.com/package/bcrypt): Version 5.0.1
* [dotenv](https://www.npmjs.com/package/dotenv): Version 8.2.0
* [express](https://www.npmjs.com/package/express): Version 4.17.1
* [mysql2](https://www.npmjs.com/package/mysql2): Version 2.2.5
* [sequelize](https://www.npmjs.com/package/sequelize): Version 6.6.2
* [ts-node](https://www.npmjs.com/package/ts-node): Version 9.1.1
* [typescript](https://www.npmjs.com/package/typescript): Version 4.2.3

## Installation
[comment]: <> (***)
```
$ git clone https://github.com/LPiz05/ZooManager
$ cd ZooManager
$ cp .env.exemple .env  // Change values in .env file
$ npm install
$ npm start
```
Side information: if do you want lunch the app with a button 'start', configure the button and put these parameters : ```ts-node index.ts``` in package.json and lunch.

[comment]: <> (## Collaboration)

[comment]: <> (***)

[comment]: <> (Give instructions on how to collaborate with your project.)

[comment]: <> (> Maybe you want to write a quote in this part.)

[comment]: <> (> It should go over several rows?)

[comment]: <> (> This is how you do it.)

[comment]: <> (## FAQs)

[comment]: <> (***)

[comment]: <> (A list of frequently asked questions)

## Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/LPiz05/ZooManager/graphs/contributors">
    <img src="https://zupimages.net/up/21/15/yc46.png" alt="" width="100" />
</a>
<a href="https://github.com/LPiz05/ZooManager/graphs/contributors">
    <img src="https://zupimages.net/up/21/15/r9o2.png" alt="" width="100" />
</a>

[comment]: <> ([![]&#40;https://github.com/remarkablemark.png?size=100&#41;]&#40;https://github.com/LPiz05/ZooManager/graphs/contributors&#41;)

## ???? License
[comment]: <> (***)

[GPL 3.0 License](https://www.gnu.org/licenses/gpl-3.0.html)

<!-- Badges -->
[license-src]: https://img.shields.io/badge/License-GPL%20v3-yellow.svg
[license-href]: https://www.gnu.org/licenses/gpl-3.0.html

