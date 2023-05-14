# ParrotBot

ParrotBot is a Discord bot that uses AWS Polly to convert text to speech, providing an interactive and engaging way to communicate in your Discord server.

## Features

- Converts text to speech and sends an MP3 file of the speech to the channel.
- Allows changing the voice used for text-to-speech.
- Lists all available AWS Polly voices with neural capability that can be used for text-to-speech.

## Commands

- `.create [text]`: Converts the provided text to speech and sends an MP3 file of the speech to the channel.
- `.voice [voice name]`: Changes the voice used for text-to-speech. The voice name must be one of the available AWS Polly voices with neural capability.
- `.voices`: Lists all available AWS Polly voices with neural capability that can be used for text-to-speech.

## Installation

1. Clone this repository: `git clone https://github.com/yourusername/ParrotBot.git`
2. Install the dependencies: `npm install`
3. Create a `.env` file in the root directory of the project, and add your Discord token and AWS credentials:

    ```env
    TOKEN=your_discord_token
    AWS_ACCESS_KEY_ID=your_aws_access_key_id
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    AWS_REGION=your_aws_region
    ```

4. Start the bot: `npm start`

## License

MIT
