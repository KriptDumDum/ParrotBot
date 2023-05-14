require('dotenv/config');
const fs = require('fs');
const { Client, IntentsBitField } = require('discord.js');
const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const Polly = new AWS.Polly();

let currentVoice = 'Joanna'; // Default voice

// List of valid voices with neural capability
const validVoices = ['Joanna', 'Matthew', 'Ivy', 'Kendra', 'Kimberly', 'Salli', 'Joey', 'Justin', 'Amy', 'Brian', 'Emma', 'Raveena'];

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('.create ')) {
    const text = message.content.slice('.create '.length);

    const params = {
      OutputFormat: 'mp3',
      Text: text,
      VoiceId: currentVoice,
      Engine: 'neural' // Use neural text-to-speech engine
    };

    try {
      const data = await Polly.synthesizeSpeech(params).promise();
      const audioFilePath = `${message.author.id}.mp3`;
      fs.writeFileSync(audioFilePath, data.AudioStream);
      message.reply({ files: [audioFilePath] });
    } catch (err) {
      console.log(err);
    }
  } else if (message.content.startsWith('.voice ')) {
    const voice = message.content.slice('.voice '.length);
    if (validVoices.includes(voice)) {
      currentVoice = voice;
      message.channel.send(`Voice changed to ${voice}`);
    } else {
      message.channel.send(`Invalid voice. Please choose a valid voice.`);
    }
  } else if (message.content === '.voices') {
    message.channel.send(`Available voices: ${validVoices.join(', ')}`);
  }
});

client.login(process.env.TOKEN);
