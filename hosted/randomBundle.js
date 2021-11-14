"use strict";

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "domoList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyDomo"
    }, "No Domos to Randomize :("));
  }

  var random = Math.floor(Math.random() * props.domos.length);
  return /*#__PURE__*/React.createElement("div", {
    className: "domoList"
  }, /*#__PURE__*/React.createElement("div", {
    key: props.domos[random]._id,
    className: "domo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "/assets/img/domoface.jpeg",
    alt: "domo face",
    className: "domoFace"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "domoName"
  }, " Name: ", props.domos[random].name, " "), /*#__PURE__*/React.createElement("h3", {
    className: "domoAge"
  }, " Age: ", props.domos[random].age, " "), /*#__PURE__*/React.createElement("h3", {
    className: "domoLevel"
  }, " Level: ", props.domos[random].level, " ")));
};

var loadRanDomoFromServer = function loadRanDomoFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
      domos: data.domos
    }), document.querySelector("#ranDomo"));
  });
};

var setup = function setup(csrf) {
  var randomButton = document.querySelector("#randomButton");
  randomButton.addEventListener("click", function (e) {
    e.preventDefault();
    loadRanDomoFromServer(csrf);
    return false;
  });
  loadRanDomoFromServer(csrf); //default view
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
