"use strict";

/*
Added Array.prototype.find Polyfill
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find#Polyfill
https://tc39.github.io/ecma262/#sec-array.prototype.find
*/
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}

// GET file data
function getFiles() {
  return $.ajax('/api/file').then(function (res) {
    console.log("Results from getFiles()", res);
    return res;
  }).fail(function (err) {
    console.error("Error in getFiles()", err);
    throw err;
  });
}

// reload file list on page
function refreshFileList() {
  var template = $('#list-template').html();
  var compiledTemplate = Handlebars.compile(template);

  getFiles().then(function (files) {

    // save file array to global window object
    window.fileList = files;

    var data = { files: files };
    var html = compiledTemplate(data);
    $('#list-container').html(html);
  });
}

refreshFileList();

// clear file form or set with data to be edited
function setFormData(data) {
  // set as file data or empty
  data = data || {};

  var file = {
    series: data.series || '',
    volume: data.volume || '',
    issue: data.issue || '',
    coverDate: data.coverDate || '',
    _id: data._id || ''
  };

  // populate with data to edit if it exists
  $('#file-series').val(file.series);
  $('#file-volume').val(file.volume);
  $('#file-issue').val(file.issue);
  $('#file-coverDate').val(file.coverDate);
  $('#file-id').val(file._id);
}

function toggleAddFileForm() {
  setFormData({});
}

// edit list item
function editFileClick(id) {
  var file = window.fileList.find(function (file) {
    return file._id === id;
  });
  if (file) {
    setFormData(file);
  }
}

// send delete list item
function deleteFileClick(id) {
  if (window.confirm("Are you sure?")) {
    $.ajax({
      type: 'DELETE',
      url: '/api/file/' + id,
      dataType: 'json',
      contentType: 'application/json'
    }).done(function (response) {
      console.log("File", id, "is DOOMED!!!!!!");
      refreshFileList();
    }).fail(function (error) {
      console.error("I'm not dead yet!", error);
    });
  }
}

// collect and POST data
function submitFileForm() {
  // first collect the data
  var fileData = {
    series: $('#file-series').val(),
    volume: $('#file-volume').val(),
    issue: $('#file-issue').val(),
    coverDate: $('#file-coverDate').val(),
    _id: $('#file-id').val()
  };

  // set submit to POST or PUT
  var method = void 0,
      url = void 0;
  if (fileData._id) {
    method = 'PUT';
    url = '/api/file/' + fileData._id;
  } else {
    method = 'POST';
    url = '/api/file';
  }

  // then send the data
  $.ajax({
    type: method,
    url: url,
    data: JSON.stringify(fileData),
    dataType: 'json',
    contentType: 'application/json'
  }).done(function (response) {
    console.log("We have posted the data");
    refreshFileList();
  }).fail(function (error) {
    console.error("Failures at posting, we are", error);
  });

  console.log("Your file data", fileData);
}

// toggle visibility of 'edit' and 'delete' buttons
function toggleEdit() {
  $('.edit-mode').toggleClass("invisible");
}