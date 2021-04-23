export function getFavFromLocalStorage() {
    return JSON.parse(localStorage.getItem('favorits'))
}

export function setOrRemoveFavInLocalStorage  (fav) {
    const favList = getFavFromLocalStorage() ?? []
    if (favList.find(favItem => favItem === fav)) {
      const filderedList = favList.filter(favItem => favItem !== fav)
      return localStorage.setItem('favorits', JSON.stringify(filderedList)) 
    }
    favList.push(fav)
    localStorage.setItem('favorits', JSON.stringify(favList))
}

