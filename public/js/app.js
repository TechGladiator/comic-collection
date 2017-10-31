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

// toggle/cancel form
function toggleAddFileFormVisibility() {
  $('#form-container').toggleClass('hidden');
}

function toggleAddFileForm() {
  toggleAddFileFormVisibility();
}

function cancelFileForm() {
  toggleAddFileFormVisibility();
}

// edit list item
function editFileClick(id) {
  const file = window.fileList.find(file => file._id === id);
  if (file) {
    // open form and populate with data to edit
    $('#file-series').val(file.series);
    $('#file-volume').val(file.volume);
    $('#file-issue').val(file.issue);
    $('#file-coverDate').val(file.coverDate);
    $('#file-id').val(file._id);
    toggleAddFileFormVisibility();
  }
}

// collect and POST data
function submitFileForm() {
  console.log("You clicked 'submit'. Congratulations.");

  // first collect the data
  const series = $('#file-series').val();
  const volume = $('#file-volume').val();
  const issue = $('#file-issue').val();
  const coverDate = $('#file-coverDate').val();
  const fileData = {
    series: series,
    volume: volume,
    issue: issue,
    coverDate: coverDate,
  };

  // then POST the data
  $.ajax({
  type: "POST",
  url: '/api/file',
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
