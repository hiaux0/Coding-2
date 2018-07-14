export function configure(config) {
  config.globalResources(
    PLATFORM.moduleName('./home'),
    PLATFORM.moduleName('./value-converters/list-sorter')
  );
}
