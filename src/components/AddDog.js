import React, { Component } from 'react';

class AddDog extends Component {
  constructor() {
    super();
    this.state = {
      newDog:{}
    }
  }

  handleSubmit(e) {
    if(this.refs.title.value === '') {
      alert('Заголовок is required');
    } else if (this.refs.tags.value === '') {
        alert('Тег is required');
    } else if (this.refs.body.value === '') {
          alert('Запись is required');
    } else {
				let value = localStorage.getItem('dogs');
			value = JSON.parse(value);
			var id = Math.max.apply(Math,value.map(function(o){return o.id;}));
			//alert(JSON.stringify(id));
			id = (JSON.stringify(id) === 'null') ? 0 : id+1;
      this.setState({newDog:{
		id: id, 
        title: this.refs.title.value,
        body: this.refs.body.value,
        tags: [].concat(this.refs.tags.value)
      }}, function() {
        //console.log(this.state);
        this.props.addDog(this.state.newDog);
      });
    }
    e.preventDefault();
	this.reset();
  }
  
   reset() { //сброс
       for(var i = 0; i < 3; i++) { 
           		document.getElementsByClassName('form-control')[i].value = '';
        }   
    }

  render() {
    return (
      <form id="post-add" className="col-lg-4" onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <br />
            <input type="text" className="form-control" name="title" ref="title" placeholder="заголовок"></input>
          </div>
          <div className="form-group">
            <br />
            <input type="text" className="form-control" name="body" ref="body" placeholder="запись"></input>
          </div>
          <div className="form-group">
            <br />
            <input type="text" className="form-control" name="tags" ref="tags" placeholder="тег, еще тег"></input>
          </div>
          <br />
          		  <button type="submit" className="btn btn-primary">Добавить</button>
          <br />
        </form>
    );
  }
}

export default AddDog;
