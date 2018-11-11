import './sandbox.less'

export class Sandbox {
  activate(params) {
    if (params.viewModel) this.viewModel = `./${params.viewModel}/${params.viewModel}`;
  }
}

// tree shaking
// code splitting
