'use strict'
var v = require('../internal/voice.js')
var Commands = []

Commands.music = {
  name: 'music',
  help: "I'll pause or play the music, just tell me what after the command!",
  aliases: ['pauseplay', 'playpause'],
  noDM: true,
  level: 1,
  fn: function (msg, suffix, bot) {
    v.music(msg, suffix, bot)
  }
}

Commands.volume = {
  name: 'volume',
  help: "I'll change my volume!",
  aliases: ['vol'],
  noDM: true,
  level: 2,
  fn: function (msg, suffix, bot) {
    v.volume(msg, suffix, bot)
  }
}

Commands.voteskip = {
  name: 'voteskip',
  help: 'Vote to skip the current playing song.',
  noDM: true,
  level: 1,
  fn: function (msg, suffix, bot) {
    v.voteSkip(msg, bot)
  }
}

Commands.shuffle = {
  name: 'shuffle',
  help: 'Shuffle the current playlist.',
  noDM: true,
  level: 2,
  fn: function (msg, suffix, bot) {
    v.shuffle(msg, bot)
  }
}

Commands['leave-voice'] = {
  name: 'leave-voice',
  help: "I'll leave the current voice channel.",
  noDM: true,
  level: 1,
  fn: function (msg, suffix, bot) {
    v.leave(msg, suffix, bot)
  }
}

Commands.skip = {
  name: 'skip',
  help: "I'll skip this song if you don't like it.",
  noDM: true,
  level: 2,
  fn: function (msg, suffix, bot) {
    v.skip(msg, suffix, bot)
  }
}

Commands.playlist = {
  name: 'playlist',
  help: "I'll fetch you the playlist I'm currently playing!",
  aliases: ['list'],
  noDM: true,
  timeout: 10,
  level: 0,
  fn: function (msg) {
    v.fetchList(msg).then((r) => {
      var arr = []
      arr.push('Now playing: **' + r.info[0] + '** \n')
      for (var i = 1; i < r.info.length; i++) {
        arr.push((i + 1) + '. **' + r.info[i] + '** Requested by ' + r.requester[i])
        if (i === 9) {
          arr.push('And about ' + (r.info.length - 10) + ' more songs.')
          break
        }
      }
      msg.channel.sendMessage(arr.join('\n')).then((m) => {
        setTimeout(() => {
          m.delete()
        }, 15000)
      })
    }).catch(() => {
      msg.channel.sendMessage("It appears that there aren't any songs in the current queue.")
    })
  }
}

Commands.voice = {
  name: 'voice',
  help: "I'll join a voice channel!",
  aliases: ['join-voice'],
  noDM: true,
  timeout: 10,
  level: 1,
  fn: function (msg, suffix, bot) {
    v.join(msg, suffix, bot)
  }
}

Commands.request = {
  name: 'request',
  help: 'Use this to request songs!',
  aliases: ['queue'],
  noDM: true,
  usage: 'link',
  level: 1,
  fn: function (msg, suffix, bot) {
    suffix.split(' ').forEach(function (songId) {
      var u = require('url').parse(suffix)
      if (u.host === null) {
        if (songId) {
          v.request(msg, 'ytsearch:' + songId, bot)
        }
      } else {
        v.request(msg, songId, bot)
      }
    })
  }
}

exports.Commands = Commands
