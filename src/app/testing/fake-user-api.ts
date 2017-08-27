export let fakeUserApi = {
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      //this.currentUserService.set(user);
      resolve();
    });
  },

  logout() {
    return new Promise((resolve, reject) => {
      //this.currentUserService.clear();
      resolve();
    });
  }
}
