import React from 'react';

exports.TagContainer = React.createClass({
  render: function () {
    var tagNodes = this.props.searchCriteria.map(function(tag, idx) {
      //console.log("TagContainer/tagNodes/tag",tag,"idx",idx);
      return (
        <Tag
          text={ tag }
          removeBrowseTag={ this.props.removeBrowseTag }
          removeSearchTag={ this.props.removeSearchTag }
          key={idx}
        />
      );
    }.bind(this));
    return (
      <div className="taglist">
        { tagNodes }
      </div>
    );
  }
});

var Tag = exports.Tag = React.createClass({
  removeTag: function(e) {
    console.log("e.target.textContent:",e.target.textContent);
    if (window.location.pathname === "/browse") {
      this.props.removeBrowseTag(e.target.textContent);
    } else if (window.location.pathname === "/search") {
      this.props.removeSearchTag(e.target.textContent);
    }
  },

  render: function () {
    return(
      <div
        className="chipx valign hoverable tag-hand"
        textContent={this.props.text}
        onClick={this.removeTag}
      > {/*custom chip*/}
        <i className="chipx material-icons">close</i>
        {this.props.text}
      </div>
    );
  }
});