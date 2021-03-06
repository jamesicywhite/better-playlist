import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultStyle = {
  color: '#fff'
};
let fakeServerData = {
  user: {
    name: 'Jay',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          {name: 'Le Song', duration: 12456},
          {name: 'The song', duration: 34587}, {name: 'Sangen', duration: 700000}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: 'Le Song', duration: 12456},
          {name: 'The song', duration: 34587}, {name: 'Sangen', duration: 700000}
        ]
      },
      {
        name: 'Another Playlist - Temp Stuff',
        songs: [
          {name: 'Le Song', duration: 12456},
          {name: 'The song', duration: 34587}, {name: 'Sangen', duration: 700000}]
      },
      {
        name: 'Playlist - Yeah!',
        songs: [
          {name: 'Le Song', duration: 12456},
          {name: 'The song', duration: 34587}, {name: 'Sangen', duration: 700000}
        ]
      },
    ]
  }
}

class PlaylistCounter extends Component {
  render() {
    return(
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return(
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{Math.floor(totalDuration/60)} Hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
      <div style={defaultStyle}>
        <img/>
        <input type="text"/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return(
      <div style={{...defaultStyle, width: "25%", display: 'inline-block'}}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {this.props.playlist.songs.map(song => 
            <li>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
  }, 1000);
}
  render() {

    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>
            {this.state.serverData.user.name}'s Playlist
          </h1>
            <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
            <HoursCounter playlists={this.state.serverData.user.playlists}/>
            <Filter/>
            {this.state.serverData.user.playlists.map(playlist =>
              <Playlist playlist={playlist} />
            )}
        </div> : <h1 style={{...defaultStyle, fontSize: '64px'}}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
