import {SERVER_URL} from './utils/constants';


export const addRequest = request => ({ type: 'ADD_REQUEST', data: request });
export const choosedProposal = (proposalId) => ({ type: 'CHOOSED_PROPOSAL', data: proposalId })
export const deleteRequest = (requestId) => ({ type: 'DELETE_REQUEST', data: requestId });

export const getSoundTracks = (soundtracks) => ({ type: 'GET_SOUNDTRACKS', data: soundtracks });
export const getNotifications = (notifications) => ({ type: 'GET_NOTIFICATIONS', data: notifications });
export const editNotification = (id) => ({type: 'EDIT_NOTIFICATIONS',data: id});
export const publishNotification = (id) => ({type: 'PUBLISH_NOTIFICATIONS',data: id});
export const hideSAModal = () => ({ type: 'HIDE_SA_MODALS' });

export const hideNotifictionModal = () => ({ type: 'HIDE_NOTIFICATION_MODAL' });

export const showDescriptionModal = (modalProps) => ({ type: 'SHOW_DESCRIPTION_MODAL', data: modalProps });
export const hideDescriptionModal = () => ({ type: 'HIDE_DESCRIPTION_MODAL' });

export const getActualNotification = (notifications,notificationId) => ({ type: 'GET_ACTUAL_NOTIFICATION', data: {notifications, notificationId} });

export const getArtistArtworks = artworks => ({type: 'GET_ARTIST_ARTWORKS', data: artworks});

export const getProposals = proposals => ({type: 'GET_PROPOSALS', data: proposals});

export const getSoundTracksByArtist = id => ({type: 'GET_SOUNDTRACK_BY_ARTIST'})

export const fetchArtistArtworks = (id) => {
  return dispatch => {
      jQuery.ajax({
        method: "GET",
        url: `${SERVER_URL}/comercial_agent/artists/${id}/artworks/`,
        statusCode: {
        200: (data) => {
          dispatch(getArtistArtworks(data.artworks))
        },
        404: (err) => {
          dispatch(showSAModal({
            show: true,
            type: "error",
            title: "Error",
            text: `status: ${err.status} \nstatusText: ${err.statusText}`
          }))
        }
      }
    });
  }
}
export const fetchSoundTracks = (filter, type) => {
  return dispatch => {
    jQuery.ajax({
        method: "GET",
        url: `${SERVER_URL}/comercial_agent/sounds/${type}/${filter}`,
        statusCode: {
        200: (data) => {
          dispatch(getSoundTracks(data))
          //dispatch(resetPlayerAudios())
          dispatch(setPlayerAudios(data.sounds))
        },
        404: (err) => {
          dispatch(showSAModal({
            show: true,
            type: "error",
            title: "Error",
            text: `status: ${err.status} \nstatusText: ${err.statusText}`
          }))
        }
      }
    });
  }
};
export const fetchNotifications = (id) => {
  return dispatch => {
    jQuery.ajax({
        method: "GET",
        url: `${SERVER_URL}/comercial_agent/notifications/user/${id}/`,
        statusCode: {
        200: (data) => {
          localStorage.setItem("NOTIFICATIONS", JSON.stringify(data));
          dispatch(getNotifications(data))
        },
        404: (err) => {
          dispatch(showSAModal({
            show: true,
            type: "error",
            title: "Error",
            text: `status: ${err.status} \nstatusText: ${err.statusText}`
          }))
        }
      }
    });
  }
};
export const fetchOpenNotifications = () => {
  return dispatch => {
    jQuery.ajax({
        method: "GET",
        url: `${SERVER_URL}/comercial_agent/notifications/open-notifications/`,
        statusCode: {
        200: (data) => {
          localStorage.setItem("NOTIFICATIONS", JSON.stringify(data));
          dispatch(getNotifications(data))
        },
        404: (err) => {
          dispatch(showSAModal({
            show: true,
            type: "error",
            title: "Error",
            text: `status: ${err.status} \nstatusText: ${err.statusText}`
          }))
        }
      }
    });
  }
};

import {audiosDefault} from "./testData/audios";
export const fetchProposals = (id) => {
  return dispatch => {
    if(!!id){
      jQuery.ajax({
        method: "GET",
        url: `${SERVER_URL}/comercial_agent/notifications/${id}/postulations/`
      })
      .done(( data ) => {
        let proposals = data.proposals;

        if(proposals.length> 0 ){
          dispatch(getProposals(proposals))
          // dispatch(resetPlayerAudios())
          //dispatch(setPlayerAudios(proposals))
        }else {
          dispatch(showSAModal({
            show: true,
            type: "warning",
            title: "Advertencia",
            text: 'No hay propuestas en esta convocatoria'
          }))
        }
      })
      .fail((err) => {
        console.error(`postulations: ${err}`);
        dispatch(showSAModal({
          show: true,
          type: "error",
          title: "Error",
          text: `status: ${err.status} \nstatusText: ${err.statusText}`
        }))
      });
    }
  }
}

export const resetPlayerAudios = () => ({type: 'RESET_AUDIOS'})
export const setPlayerAudios = (audios) => ({type: 'SET_AUDIOS',data: audios})
export const setActualUserType = (userType) => ({ type: 'SET_USER_TYPE', data: userType });
export const setRequest = (request) => ({ type: 'SET_REQUEST', data: request });
export const setUserId = (id) => ({ type: 'SET_USER_ID', data: id});
export const showNotifictionModal = (modalProps) => ({ type: 'SHOW_NOTIFICATION_MODAL', data: modalProps });
export const showSAModal = (modalProps) => ({ type: 'SHOW_SA_MODALS', data: modalProps });
