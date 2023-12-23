import {Document} from 'mongoose';
import {quoteDetails} from '../../interface/userSes'

export interface quoteScheme extends quoteDetails, Document{}

