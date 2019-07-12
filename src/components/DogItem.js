import React, { Component } from 'react';

class DogItem extends Component {
  deleteDog(name) {
    this.props.onDelete(name);
  }

  render() {
   let dogItem; 
   var tags = this.props.dog.tags;      
      dogItem = tags.map(function(tag) {
        return (
          <div className="tags">
          <button className="btn btn-xs btn-default">{tag}</button>
        </div>
        );
      })
	  
      return (
      <article>
	    <header>
			  <h3>{this.props.dog.title}</h3>
		</header>
		 <section>
			<p>{this.props.dog.body}</p>
         </section>
         <footer>
         {dogItem} 
         </footer>
            <div className="controls">
                        <button className="btn btn-danger btn-mini" onClick={this.deleteDog.bind(this, this.props.dog.id)}>удалить</button>
            </div>      
	  </article>
    );
  }
}

export default DogItem;
