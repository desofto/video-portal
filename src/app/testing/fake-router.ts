export let fakeRouter = {
  navigate(route: Array<any>) {
    this.route = route;
  }
}
