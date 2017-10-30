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

function refreshFileList() {
  const template = $('#list-template').html();
  const compiledTemplate = Handlebars.compile(template);

  getFiles()
    .then(files => {
      const data = {files: files};
      const html = compiledTemplate(data);
      $('#list-container').html(html);
    })
}

function toggleAddFileFormVisibility() {
  $('#form-container').toggleClass('hidden');
}

function toggleAddFileForm() {
  console.log("Baby steps...");
  toggleAddFileFormVisibility();
}

function submitFileForm() {
  console.log("You clicked 'submit'. Congratulations.");
  
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
  
   console.log("Your file data", fileData);
}

function cancelFileForm() {
  toggleAddFileFormVisibility();
}

refreshFileList();
