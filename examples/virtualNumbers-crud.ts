import { VirtualNumbers } from '../dist/index.js';
import { TUpdateVirtualNumberRequest } from '../dist/messaging/types';

// Auth using JSON file import
// var AUTH_CONFIG = require('./credentials.json');
// const number = new Numbers(AUTH_CONFIG);

// Auth via ENV VARS or SHARED CREDENTIALS
const virtualNumbers = new VirtualNumbers();

/**
 * VirtualNumbers    
 *  - Assign
 *  - Fetch VirtualNumber
 *  - Update VirtualNumber
 *  - Delete VirtualNumber
 */

virtualNumbers.assign()
    .then(result => { 
        console.log('SUCCESS:number:create:', result);
        const virtualNumber = result.virtualNumber;

        /** Fetch VirtualNumber */
        virtualNumbers.get(virtualNumber)
        .then(getVNResponse => console.log('SUCCESS:virtualNumber:get:', getVNResponse))
        .catch(getVNError => console.error('ERROR:virtualNumbers:get:', getVNError));

        /** Fetch all opt-out numbers */
        virtualNumbers.getOptouts(virtualNumber)
        .then(getVNOptoutsResponse => console.log('SUCCESS:virtualNumber:get:optouts', getVNOptoutsResponse))
        .catch(getVNOptoutsError => console.error('ERROR:virtualNumbers:get:optouts', getVNOptoutsError));

        /** Update VirtualNumber */
        const updateParams: TUpdateVirtualNumberRequest = {
            virtualNumber,            
            updateData: { tags: ['V3'] },
        }
        virtualNumbers.update(updateParams)
        .then(updateVNResponse => console.log('SUCCESS:virtualNumber:update:', updateVNResponse))
        .catch(updateVNError => console.error('ERROR:virtualNumbers:update:', updateVNError));

        /** Delete VirtualNumber */
        virtualNumbers.delete(virtualNumber)
        .then(deleteVNResponse => console.log('SUCCESS:virtualNumber:delete:', deleteVNResponse))
        .catch(deleteVNError => console.error('ERROR:virtualNumbers:delete:', deleteVNError));
    })
    .catch(error => console.error('ERROR:number:create:', error));
