var isAdvancedUpload = function() {
  var div = document.createElement('div');
  return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

var $form = $('.box');
var $input = $form.find('input[type="file"]'),
    $label = $form.find('label'),
   showFiles = function(files) {
     $label.text(files.length > 1 ? ($input.attr('data-multiple-caption') || '').replace( '{count}', files.length ) : files[ 0 ].name);
   };

if (isAdvancedUpload) {
  $form.addClass('has-advanced-upload');
}

if (isAdvancedUpload) {
  var droppedFiles = false;

  $form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
  })
  .on('dragover dragenter', function() {
    $form.addClass('is-dragover');
  })
  .on('dragleave dragend drop', function() {
    $form.removeClass('is-dragover');
  })
  .on('drop', function(e) {
    droppedFiles = e.originalEvent.dataTransfer.files;
    showFiles( droppedFiles );
  //   $form.trigger('submit');
  });
}

$input.on('change', function(e) {
  console.log('Here')
  console.log('Target Files: ', e.target.files)
  showFiles(e.target.files);
});

$form.on('submit', function(e) {
  console.log('Clicked Upload')
  if ($form.hasClass('is-uploading')) return false;

  $form.addClass('is-uploading').removeClass('is-error');

  if (isAdvancedUpload) {
    // ajax for modern browsers
    console.log('Advanced Upload')
    ajaxModern(e);
  } else {
    // ajax for legacy browsers
    nonModernAjax();
  }
});

var ajaxModern = function(e) {
  e.preventDefault();
  var ajaxData = new FormData($form.get(0));

  if (droppedFiles) {
    console.log('Dropped Files Exist')
    $.each( droppedFiles, function(i, file) {
      ajaxData.append( $input.attr('name'), file );
      // sendFile(file);
    });
  }
  console.log('AJAX Data: ', ajaxData);
  $.ajax({
    url: $form.attr('action'),
    type: $form.attr('method'),
    data: ajaxData,
    // dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    complete: function() {
      $form.removeClass('is-uploading');
    },
    success: function(data) {
      $form.addClass( data.success == true ? 'is-success' : 'is-error' );
      if (!data.success)
        console.log(data.error);
    },
    error: function() {
      // Log the error, show an alert, whatever works for you
    }
  });
};

var nonModernAjax = function() {
  var iframeName  = 'uploadiframe' + new Date().getTime();
    $iframe   = $('<iframe name="' + iframeName + '" style="display: none;"></iframe>');

  $('body').append($iframe);
  $form.attr('target', iframeName);

  $iframe.one('load', function() {
    var data = JSON.parse($iframe.contents().find('body' ).text());
    $form
      .removeClass('is-uploading')
      .addClass(data.success == true ? 'is-success' : 'is-error')
      .removeAttr('target');
    if (!data.success) $errorMsg.text(data.error);
    $form.removeAttr('target');
    $iframe.remove();
  });
};

// function sendFile(file) {
//   var uri = $form.attr('action');
//   var xhr = new XMLHttpRequest();
//   var fd = new FormData($form.get(0));
//
//   xhr.open("POST", uri, true);
//   xhr.onreadystatechange = function() {
//       if (xhr.readyState == 4 && xhr.status == 200) {
//           // Handle response.
//           // alert(xhr.responseText); // handle response.
//       }
//   };
//   fd.append($input.attr('name'), file);
//   // Initiate a multipart/form-data upload
//   xhr.send(fd);
// }
