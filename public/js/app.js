// GET file data
function getFiles() {
  return $.ajax('/api/file')
  .then(res => {
    console.log("Results from getFiles()", res);
    return res;
  })
  .fail(err => {
    console.log("Error in getFiles()", err);
    throw err;
  });
}

// reload file list on page
function refreshFileList() {
  const template = $('#list-template').html();
  const compiledTemplate = Handlebars.compile(template);
  
  getFiles()
  .then(files => {

    // save file array to global window object
    window.fileList = files;

    const data = {files: files};
    const html = compiledTemplate(data);
    $('#list-container').html(html);
  })
}

refreshFileList();

// clear file form or set with data to be edited
function setFormData(data) {
  // set as file data or empty
  data = data || {};

  const file = {
    series: data.series || '',
    volume: data.volume || '',
    issue: data.issue || '',
    coverDate: data.coverDate || '',
    _id: data._id || '',
  };

  // populate with data to edit if it exists
  $('#file-series').val(file.series);
  $('#file-volume').val(file.volume);
  $('#file-issue').val(file.issue);
  $('#file-coverDate').val(file.coverDate);
  $('#file-id').val(file._id);
}

// toggle/cancel form
function toggleAddFileFormVisibility() {
  $('#form-container').toggleClass('hidden');
}

function toggleAddFileForm() {
  setFormData({});
  toggleAddFileFormVisibility();
}

function cancelFileForm() {
  toggleAddFileFormVisibility();
}

// edit list item
function editFileClick(id) {
  const file = window.fileList.find(file => file._id === id);
  if (file) {
    setFormData(file);
    toggleAddFileFormVisibility();
  }
}

// collect and POST data
function submitFileForm() {
  // first collect the data
  const fileData = {
    series: $('#file-series').val(),
    volume: $('#file-volume').val(),
    issue: $('#file-issue').val(),
    coverDate: $('#file-coverDate').val(),
    _id: $('#file-id').val(),
  };

  // set submit to POST or PUT
  let method, url;
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
  contentType : 'application/json',
  })
    .done(function(response) {
      console.log("We have posted the data");
      refreshFileList();
      toggleAddFileFormVisibility();
    })
    .fail(function(error) {
      console.log("Failures at posting, we are", error);
    });
  
  console.log("Your file data", fileData);
}
