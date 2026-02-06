// ===================================
// Music Player JavaScript
// ===================================

// Playlist configuration
const playlist = [
    {
        name: 'My Favorite Song',
        artist: 'Unknown Artist',
        file: 'assets/music/SaveTik.io_7345653757549595910.mp3'
    },
    // Add more songs here by copying the block above
    // {
    //     name: 'Song Name',
    //     artist: 'Artist Name',
    //     file: 'assets/music/your-song-file.mp3'
    // }
];

let currentTrackIndex = 0;
let audio = null;
let isPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
    initMusicPlayer();
});

function initMusicPlayer() {
    // Initialize audio element
    audio = new Audio();

    // Get elements
    const playerToggle = document.getElementById('playerToggle');
    const playerMinimize = document.getElementById('playerMinimize');
    const musicPlayer = document.getElementById('musicPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const volumeSlider = document.getElementById('volumeSlider');

    // Load saved volume or default to 0.7
    const savedVolume = localStorage.getItem('musicVolume') || 0.7;
    audio.volume = savedVolume;
    updateVolumeDisplay(savedVolume);

    // Load saved track index
    const savedTrackIndex = localStorage.getItem('currentTrack') || 0;
    currentTrackIndex = parseInt(savedTrackIndex);

    // Load first track
    loadTrack(currentTrackIndex);
    renderPlaylist();

    // Event listeners
    playerToggle.addEventListener('click', () => {
        musicPlayer.classList.toggle('minimized');
        musicPlayer.classList.toggle('expanded');
    });

    playerMinimize.addEventListener('click', () => {
        musicPlayer.classList.add('minimized');
        musicPlayer.classList.remove('expanded');
    });

    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', playPrevious);
    nextBtn.addEventListener('click', playNext);

    // Progress bar click
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    });

    // Volume slider click
    volumeSlider.addEventListener('click', (e) => {
        const rect = volumeSlider.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.volume = percent;
        localStorage.setItem('musicVolume', percent);
        updateVolumeDisplay(percent);
    });

    // Audio events
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', playNext);
    audio.addEventListener('loadedmetadata', () => {
        document.getElementById('duration').textContent = formatTime(audio.duration);
    });
}

function loadTrack(index) {
    if (index < 0 || index >= playlist.length) return;

    const track = playlist[index];
    currentTrackIndex = index;

    // Update UI
    document.getElementById('trackName').textContent = track.name;
    document.getElementById('trackArtist').textContent = track.artist;

    // Load audio
    audio.src = track.file;

    // Save current track
    localStorage.setItem('currentTrack', index);

    // Update playlist active state
    updatePlaylistActive();

    // Handle file not found error
    audio.addEventListener('error', () => {
        console.warn(`ไม่พบไฟล์เพลง: ${track.file}`);
        // You can add a placeholder message here
    });
}

function togglePlayPause() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const musicPlayer = document.getElementById('musicPlayer');

    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = '▶';
        musicPlayer.classList.remove('has-playing');
        isPlaying = false;
    } else {
        audio.play().catch(error => {
            console.warn('ไม่สามารถเล่นเพลงได้:', error);
        });
        playPauseBtn.textContent = '⏸';
        musicPlayer.classList.add('has-playing');
        isPlaying = true;
    }
}

function playPrevious() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audio.play();
    }
}

function playNext() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audio.play();
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentTime = document.getElementById('currentTime');

    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${percent}%`;
        currentTime.textContent = formatTime(audio.currentTime);
    }
}

function updateVolumeDisplay(volume) {
    const volumeFill = document.getElementById('volumeFill');
    volumeFill.style.width = `${volume * 100}%`;
}

function renderPlaylist() {
    const playlistContainer = document.getElementById('playlist');
    playlistContainer.innerHTML = '';

    playlist.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        if (index === currentTrackIndex) {
            item.classList.add('active');
        }

        item.innerHTML = `
            <span class="playlist-item-number">${index + 1}</span>
            <div class="playlist-item-info">
                <div class="playlist-item-name">${track.name}</div>
            </div>
        `;

        item.addEventListener('click', () => {
            loadTrack(index);
            if (isPlaying) {
                audio.play();
            }
        });

        playlistContainer.appendChild(item);
    });
}

function updatePlaylistActive() {
    const items = document.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        if (index === currentTrackIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
