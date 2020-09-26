$(document).ready(function() {
  (async function() {
    try {
      await $.getScript("/js/utils/isPrivate.js");
    } catch (error) {
      console.log(error);
    }
  })();
});
