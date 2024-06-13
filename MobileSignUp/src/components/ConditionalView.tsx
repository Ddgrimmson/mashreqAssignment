import React from 'react';

const ConditionalView = ({children, condition}) => {
    return condition && children;
}
 
export default ConditionalView;