import React from 'react';
import ToggleTag from './ToggleTag';

const TagGroup = ({
    name,
    tags,
    toggle,
    isSelected
}) => (
    <div className="tag-group">
        <h3>{name}</h3>
        {tags.map(tagName => (
            <ToggleTag
                key={tagName}
                name={tagName}
                toggle={toggle}
                selected={isSelected(tagName)}
            />
        ))}
    </div>
);

TagGroup.PropTypes = {
    name: React.PropTypes.string,
    tags: React.PropTypes.array.isRequired,
    toggle: React.PropTypes.func,
    isSelected: React.PropTypes.func
}

export default TagGroup;
