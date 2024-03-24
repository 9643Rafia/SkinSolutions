window.onload = function() {
    document.querySelector('.alert-overlay').style.display = 'block';
    document.querySelector('.alert-container').style.display = 'block';

    document.querySelector('.close-button').addEventListener('click', function() {
        document.querySelector('.alert-overlay').style.display = 'none';
        document.querySelector('.alert-container').style.display = 'none';
    });
};