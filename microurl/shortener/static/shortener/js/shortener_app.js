var URL = React.createClass({
  handleURLSubmit: function(url) {
    $.ajax({
      type: "POST",
      url: this.props.url,
      data: {'url': url},
      success: function(data){
        bootbox.dialog({
          message: data.url,
          title: "Your MicroURL is:",
          buttons: {
            success: {
              label: "OK",
              className: "btn-success",
              callback: function() {
                bootbox.hideAll();
              }
             }
          }
        });          
      },
      dataType: 'json'
     });
  },
  addObj: function() {
    var url = this.refs.url.getDOMNode().value.trim();
    if (this.validateURL(url)){
      this.handleURLSubmit(url);
    }else{
      bootbox.alert("There's something wrong with your URL. Perhaps your missing http://? Try http://yoursite.com instead of yoursite.com")
    }
  },
  validateURL: function(value) {
    var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    if (urlregex.test(value))
        return (true);
    return (false);
  },
  render: function() {
    return (
      <div class="curl">
          <h1>MicroURL</h1>
          <input type="text" name="url" id="url" ref="url" placeholder="http://" />
          <input class= "btn btn-success" type="button" onClick={this.addObj} value="Shorten!" />   
      </div>
    )
  }
});

React.render(<URL url={'/makeshort/'}/>, document.getElementById('content'));