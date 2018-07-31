import { inject, TemplatingEngine } from "../../../node_modules/aurelia-framework";


/**
 * 2018-07-31 22:21:07 Dropping this idea for now, since , like in labfolder, MutationSummary is also used.
 * Dont want to go through the hassle of implementing two libraries (templating engine and mutationSummary) right now.
 */
@inject(TemplatingEngine)
export class AureliaEnhance {
  constructor(templatingEngine) {
    this.templatingEngine = templatingEngine
  }


}