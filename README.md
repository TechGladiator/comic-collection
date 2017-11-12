# Comic Collection

## A database for comic book collectors

### [Live Demo](https://comic-collection-pfszdobsom.now.sh/)

### Comic Collection is a simple way to keep inventory of your comic book collection.

## Install

Clone the repository, or download the [Latest Release](https://github.com/TechGladiator/comic-collection/releases). You will need [NodeJS](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed and running.

`cd` into the `comic-collection` directory, then:

```
$ npm install
```

then

```
$ mongod
```

and finally

```
$ npm start
```

By default, simply opening your browser and navigating to http://localhost:3000/ will open Comic Collection once it is running.
## Using Comic Collection

To add a new comic issue, click on the "Add New Comic" button.

Each issue added will be displayed in it's own "card" on the main page.

### Edit Mode

To edit or delete an issue, click on the "Edit Mode" button. This will show (or hide, if clicked again) the "Edit" and "Delete" buttons for each issue in your collection.

Clicking "Edit" will open the form to edit the issue's details.

Clicking "Delete" will cause a confirmation dialog to appear. Click "Cancel" if you don't want to delete the issue, and click "Ok" to proceed with deletion.

Deleting an issue will only "Soft" delete it from the page, but it will still remain in the database. In the future, you will be able to view deleted items and either restore them, or permenantly delete them. Once permenantly deleted, they will be unrecoverable.

## Future Plans

The database is in early stages at this time, and additional details such as cover image, publisher, summary, and creator details will be added in the future. More features are planned as well, so keep watching!