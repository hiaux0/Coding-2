import { inject } from 'aurelia-dependency-injection';
import { Project, ProjectItem, CLIOptions, UI } from 'aurelia-cli';

var path = require('path');

@inject(Project, CLIOptions, UI)
export default class ElementGenerator {
  constructor(project, options, ui) {
    this.project = project;
    this.options = options;
    this.ui = ui;
  }

  execute() {
    let self = this;

    return this.ui
      .ensureAnswer(this.options.args[0], 'What would you like to call the component?')
      .then(name => {

        return self.ui.ensureAnswer(this.options.args[1], 'What sub-folder would you like to add it to?\nIf it doesn\'t exist it will be created for you.\n\nDefault folder is the source folder (src).', ".")
          .then(subFolders => {

            let fileName = this.project.makeFileName(name);
            let className = this.project.makeClassName(name);

            self.project.root.add(
              ProjectItem.text(path.join(subFolders, fileName, fileName + ".js"), this.generateJSSource(className, fileName)),
              ProjectItem.text(path.join(subFolders, fileName, fileName + ".html"), this.generateHTMLSource(fileName)),
              ProjectItem.text(path.join(subFolders, fileName, fileName + ".less"), this.generateCSSSource(fileName))
            );

            return this.project.commitChanges()
              .then(() => this.ui.log(`Created ${name} in the '${path.join(self.project.root.name, subFolders)}' folder`));
          });
      });
  }

  generateJSSource(className, fileName) {
    return `import {bindable} from 'aurelia-framework';
import './${fileName}.less'

export class ${className} {
  @bindable value = ${className};

  valueChanged(newValue, oldValue) {

  }
}
`;
  }

  generateHTMLSource(fileName) {
    return `<template>
  <require from='./${fileName}/${fileName}'></require>
  <a role="button" class='btn btn-outline-secondary btn-sm' href="#/sandbox/${fileName}">${fileName}</a>

  <h1>\${value}</h1>
</template>`;
  }

  generateCSSSource(fileName) {
    return `
.${fileName} {

}`;
  }
}
