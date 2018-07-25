import React from 'react';
import ReactDOM from 'react-dom';
import PresentationItem from '../ui/PresentationItem';
import FullHeightScroller from '../ui/FullHeightScroller';
import { connect } from 'react-redux';
import { goToPresentation, requestPresentations, togglePresentationList } from '../../action-creators';
import Config from '../../utils/Config';
import shallowEqual from 'shallowequal';

class PresentationList extends React.Component {

	constructor (props) {
		super(props);
		this.onPresentationClicked = this.onPresentationClicked.bind(this);
		this.loadMore = this.loadMore.bind(this);
	}

	loadMore (e) {
		e.preventDefault();

		this.props.dispatch(requestPresentations({
			search: this.props.searchQuery || null,
			category: this.props.category ? this.props.category.id : null,
			offset: this.props.presentations.length
		}));
	}

	onPresentationClicked (id) {
        this.updateLocationHash(id);
        this.props.dispatch(goToPresentation(id));
		if(this.props.isMobile) {
			this.props.dispatch(togglePresentationList());
		}
	}

	updateLocationHash(id){
        window.location.hash = '#/'+id;
	}

	componentDidMount (prevProps) {		
		if(this.props.presentations.length && !this.props.selectedPresentation.id) {
			var presentationId = this.props.filter != 'none' ? this.props.filter : this.props.presentations[0].id;
            this.updateLocationHash(presentationId);
			this.props.dispatch(goToPresentation(presentationId));
		}
	}

	componentWillReceiveProps(newProps) {
        if(newProps.presentations.length && this.props.filter != newProps.filter && parseInt(newProps.filter) != newProps.requestedPresentationID) {
            var presentationId = newProps.filter != 'none' ? parseInt(newProps.filter) : newProps.presentations[0].id;
			this.props.dispatch(goToPresentation(presentationId));
        }
	}

	render () {
		const {
			presentations, 
			total,
			selectedPresentation,
			searchQuery,
			category,
			initialised,
			loading
		} = this.props;
		
		if(!initialised) return <div />;

		const nextCount = Math.min(
			total - presentations.length,
			Config.get('presentationLimit')
		);

		let children = presentations.map(p => (
		    <PresentationItem 
		    	key={p.id} 
		    	selected={selectedPresentation && selectedPresentation.id == p.id}
		    	onPresentationClicked={this.onPresentationClicked}		    	
		    	presentation={p} />	
		));
		if(nextCount > 0) {
			children = children.concat(
	    		<li key="more"><a onClick={this.loadMore}>
	    			Load {nextCount} more ({presentations.length} of {total} total)
	    		</a></li>
		    );
		}  

		return (
			<div>
				{category &&
					<h5>Presentations in "{category.title}"</h5>
				}
				{searchQuery &&
					<h5>Search results for "{searchQuery}"</h5>
				}
			    <FullHeightScroller ref="scroller" pad={30} component="ul" id="presentation-list" className="presentation-list">
			    	{!!children.length && children}
			    	{!children.length && !loading &&
			    		<li>There are no presentations that match your criteria.</li>
			    	}
			    </FullHeightScroller>
		    </div>
		);
	}
}

export default connect (
	state => {
		
		return {
			...state.presentations,
			category: state.categories.selectedCategory,
			searchQuery: state.presentations.search,
			loading: state.ui.loading,
			isMobile: state.mobile.isMobile
		};
	}
)(PresentationList);