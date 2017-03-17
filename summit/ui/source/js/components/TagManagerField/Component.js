import React from 'react';
import ReactDOM from 'react-dom';
import Summary from './Summary';
import TagGroup from './TagGroup';
import StatusMessage from './StatusMessage';

import '../../../scss/tag-manager-field.scss';

const MAX_TAGS = 8;

const MSG_MORE = `Please select up to ${MAX_TAGS} tags that describe your presentation.`;
const MSG_DONE = 'You have selected the maximum number of tags.';

class TagManagerField extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTags: props.value ? props.value.split(',') : []
        };

        this.toggle = this.toggle.bind(this);
        this.isSelected = this.isSelected.bind(this);

        this.setupValidation(); // Migrated from RiotJS tag.
    }

    render() {
        const more = this.canSelectMore();
        const groups = this.props.allowedTags;

        return (
            <div>
                <StatusMessage
                    type={more ? 'info' : 'warning'}
                    message={more ? MSG_MORE : MSG_DONE}
                />
                <div className="row">
                    <div className="col-lg-9">
                        {Object.keys(groups).map(groupName => (
                            <TagGroup
                                key={groupName}
                                name={groupName}
                                tags={groups[groupName]}
                                toggle={this.toggle}
                                isSelected={this.isSelected}
                            />
                        ))}
                        <hr />
                        <input type="hidden" id="Tags" name="Tags" value={this.getValue()} />
                    </div>
                    <div className="col-lg-3">
                        <Summary
                            limit={MAX_TAGS}
                            selected={this.state.selectedTags.length}
                        />
                    </div>
                </div>
            </div>
        );
    }

    toggle(tagName) {
        const index = this.state.selectedTags.indexOf(tagName);

        this.setState(prevState => {
            // Clone array to ensure immutability.
            let selectedTags = prevState.selectedTags.slice(0);

            if (index >= 0) { // Tag exists.
                selectedTags.splice(index, 1);
            } else if (this.canSelectMore()) {
                selectedTags.push(tagName);
            }
            return { selectedTags };
        });
    }

    canSelectMore() {
        return this.state.selectedTags.length < MAX_TAGS;
    }

    isSelected(tagName) {
        return this.state.selectedTags.indexOf(tagName) >= 0;
    }

    getValue() {
        return this.state.selectedTags.join(',');
    }

    setupValidation() {
        $('form').validate({
            ignore: [],
            rules:  {},
            invalidHandler: (form, validator) => {
                if (validator.numberOfInvalids()) {

                    var element = validator.errorList[0].element;
                    var offset = (element.name == 'Tags')
                        ? $(element).prev().offset().top
                        : $(element).offset().top;

                    $('html, body').animate({
                        scrollTop: offset-100
                    }, 2000);
                }
            }
        });
    }
}

// Load component in the target DIV.
// @See summit/ui/source/js/components/TagManagerField/Component.js
// @See summit/code/forms/TagManagerField.php for category_tags var

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('os-tag-manager-field');
    const props = {
        value: wrapper.getAttribute('value'),
        allowedTags: category_tags
    }
    ReactDOM.render(
        React.createElement(TagManagerField, props), wrapper
    );
});
