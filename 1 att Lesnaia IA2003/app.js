const app = angular.module("myApp", []);

app.service("auth", function () {

  // уже существующий пользователь  
  const users = [{
    login: "kate",
    password: "pass",
  }, ];

  let badLogins = 0;
  this.getBadLogins = () => badLogins;
  this.addBadLogins = () => {
    badLogins += 1;
  };
  this.checkUser = (user) => {
    const resultName = users.find((obj) => obj.login === user.login);
    if (!resultName) return "name";
    if (resultName.password !== user.password) return "password";
    return resultName;
  };
});

app.controller("authController", function ($scope, auth) {
  $scope.currentUser = {
    login: "undefined"
  };
  $scope.getBadLogins = auth.getBadLogins();
  $scope.ifBad = false;
  $scope.message = "";
  $scope.danger = "";
  $scope.submitForm = () => {

    const result = auth.checkUser($scope.user);
    if (result === "name" || result === "password") {
      $scope.message = result === "name" ? "Неверное имя пользователя" : "Неверный пароль";
      auth.addBadLogins();
    } else {
      $scope.currentUser = result;
      $scope.currentName = $scope.currentUser["login"];
      $scope.currentPassword = $scope.currentUser["password"];
    }

    // подсчет количества попыток входа
    if (auth.getBadLogins() == 10) {
      $scope.ifBad = true;
      $scope.danger = "Попытка взлома";
    }
  };

});