const colors = require('colors');
const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra');
let TaskPaperParser = require("taskpaper-parser");

let Root = TaskPaperParser.Root;
let Project = TaskPaperParser.Project;
let Task = TaskPaperParser.Task;
let Tag = TaskPaperParser.Tag;
let Comment = TaskPaperParser.Comment;

const configReader = require('../../config/config');
const stringHelper = require('../../common/string-helper');
const todoReader = require('../../extracting/reader');

const defaultTaskpaperFilepath = 'todoco.taskpaper';

function toTaskpaper(files) {
    return new Promise ((fulfill, reject) => {
        todoReader.json(files).subscribe(todos => {
            // Todo: bestehende Taskpaper file soll mit neuen Ergebnissen gemerged werden
            let taskPaperFile = new Root();

            _.forEach(todos, todo => {

                let filename = path.basename(todo.file);
                let filepath = path.dirname(todo.file);

                // Todo: Überlegen ob der Pfad als Kommentar gespeichert werden soll
                // Todo: mit mächtigen Filtermöglichkeiten von taskpaper auseinandersetzen
                let project = new Project(filename);
                let comment = new Comment(filepath);

                project.addChild(comment);

                _.forEach(todo.todos, td => {

                    let task = new Task(td.text);
                    let line = new Tag('Line', td.line);

                    task.addTag(line);
                    project.addChild(task);
                });

                taskPaperFile.addChild(project);
            });

            let file = taskPaperFile.serialize();


            writeTaskpaperFile(file, fulfill, reject);

        });
    });
}

function writeTaskpaperFile(file, fulfill, reject) {

    let config = configReader.readConfig();

    if (config && config.taskpaper && config.taskpaper.file) {
        let filepath = config.taskpaper.file;
        fs.outputFile(filepath, file, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                fulfill();
            }
        });
    } else {
        fs.outputFile(defaultTaskpaperFilepath, file, 'utf8', (err) => {
            if (err) {
                reject(err);
            } else {
                fulfill();
            }
        });
    }
}

module.exports = toTaskpaper;
