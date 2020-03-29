import { FETCH_EVENTS } from './eventConstants';
import {
	asyncActionStart,
	asyncActionFinish,
	asyncActionError
} from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockApi';
import { toastr } from 'react-redux-toastr';
import { createNewEvent } from '../../app/common/util/helpers';
import firebase from '../../app/config/firebase';

export const createEvent = event => {
	return async (dispatch, getState, { getFirestore, getFirebase }) => {
		const firestore = getFirestore();
		const firebase = getFirebase();
		const user = firebase.auth().currentUser;
		const photoURL = getState().firebase.profile.photoURL;
		const newEvent = createNewEvent(user, photoURL, event);

		try {
			let createdEvent = await firestore.add('events', newEvent);
			await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
				eventId: createdEvent.id,
				userUid: user.uid,
				eventDate: event.date,
				host: true
			});
			toastr.success('Success!', 'Event has been created');
			return createdEvent;
		} catch (error) {
			toastr.error('Ops', 'Something went wrong');
		}
	};
};

export const updateEvent = event => {
	return async (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		try {
			await firestore.update(`events/${event.id}`, event);
			toastr.success('Success!', 'Event has been updated');
		} catch (error) {
			toastr.error('Ops', 'Something went wrong');
		}
	};
};

export const cancelToggle = (cancelled, eventId) => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	const firestore = getFirestore();
	const message = cancelled
		? 'Are you sure you want to cancel the event?'
		: 'This will reactivate the event, are you sure?';
	try {
		toastr.confirm(message, {
			onOk: async () =>
				await firestore.update(`events/${eventId}`, {
					cancelled: cancelled
				})
		});
	} catch (error) {
		console.log(error);
	}
};

export const loadEvents = () => {
	return async dispatch => {
		try {
			dispatch(asyncActionStart());
			const events = await fetchSampleData();
			dispatch({ type: FETCH_EVENTS, payload: { events } });
			dispatch(asyncActionFinish());
		} catch (error) {
			console.log(error);
			dispatch(asyncActionError);
		}
	};
};

export const goingToEvent = event => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const firestore = getFirestore();
	const firebase = getFirebase();
	const user = firebase.auth().currentUser;
	const profile = getState().firebase.profile;
	const attendee = {
		going: true,
		joinDate: firestore.FieldValue.serverTimestamp(),
		photoURL: profile.photoURL || '/assets/user.png',
		displayName: profile.displayName,
		host: false
	};
	try {
		await firestore.update(`events/${event.id}`, {
			[`attendees.${user.uid}`]: attendee
		});
		await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
			eventId: event.id,
			userUid: user.uid,
			eventDate: event.date,
			host: false
		});
		toastr.success('Success', 'You have signed up to the event');
	} catch (error) {
		console.log(error);
		toastr.error('Oops', 'Problem signing to this event');
	}
};

export const cancelGoingToEvent = event => async (
	dispatch,
	getState,
	{ getFirestore, getFirebase }
) => {
	const firestore = getFirestore();
	const firebase = getFirebase();
	const user = firebase.auth().currentUser;
	try {
		await firestore.update(`events/${event.id}`, {
			[`attendees.${user.uid}`]: firestore.FieldValue.delete()
		});
		await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
		toastr.success('Success', 'You have removed yourself from the event');
	} catch (error) {
		console.log(error);
		toastr.error('Oops', 'Something went wrong');
	}
};

export const getEventsForDashboard = lastEvent => async (
	dispatch,
	getState
) => {
	let today = new Date();
	const firestore = firebase.firestore();
	const eventsRef = firestore.collection('events');
	try {
		dispatch(asyncActionStart());

		let startAfter =
			lastEvent &&
			(await firestore
				.collection('events')
				.doc(lastEvent.id)
				.get());

		let query;

		lastEvent
			? (query = eventsRef
					//.where('date', '>=', today)
					.orderBy('date')
					.startAfter(startAfter)
					.limit(2))
			: (query = eventsRef
					//.where('date', '>=', today)
					.orderBy('date')
					.limit(2));

		let querySnap = await query.get();
		if (querySnap.docs.length === 0) {
			dispatch(asyncActionFinish());
			return querySnap;
		}

		let events = [];

		for (let i = 0; i < querySnap.docs.length; i++) {
			let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
			events.push(evt);
		}
		dispatch({ type: FETCH_EVENTS, payload: { events } });
		dispatch(asyncActionFinish());
		return querySnap;
	} catch (error) {
		console.log(error);
		dispatch(asyncActionError());
	}
};
