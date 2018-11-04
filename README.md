# Tema proiect: Manager videoclipuri favorite integrata cu Youtube

# Membrii echipei:
* Ghețe Victor- Daniel
* Oancea Ileana Teodora


# Descriere proiect

* Realizarea unei aplicații pe tema "manager videoclipuri favorite",care accesează date stocate într-o bază relațională pe baza unui API de persistenţă.
* API pentru Youtube permite userilor sa caute videoclipuri, sa vada continutul, sa uploadeze videoclipuri, sa modifice playlisturile etc. Acest API permite userilor sa dezvolte o aplicatie web care sa uploadeze videoclipuri pe Youtube.
* De asemenea, acest API poate fi folosit pentru a personaliza un site sau o aplicatie cu informatiile existente ale userului, precum comentarii sau rating pentru videoclipuri.
* Acest API RESTful ofera raspunsuri in format XML.

## Exemplu request:
GET {base_url}/channels?part=contentDetails
                       &mine=true
                       
## Exemplu response:    
* raspunsul la acest request include channel ID si contentDetails pentru userul autentificat pe youtube 

{
  "id": {CHANNEL_ID},
  "kind": "youtube#channel",
  "etag": etag,
  "contentDetails": {
    "relatedPlaylists": {
      "likes": {LIKES_PLAYLIST_ID},
      "favorites": {FAVORITES_PLAYLIST_ID},
      "uploads": {UPLOADS_PLAYLIST_ID},
      "watchHistory": {WATCHHISTORY_PLAYLIST_ID},
      "watchLater": {WATCHLATER_PLAYLIST_ID}
    },
    "googlePlusUserId": string
  },
}

