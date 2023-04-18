const { Client, MessageEmbed, Intents } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const chatGPTApiKey = 'API KEY';

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: chatGPTApiKey,
});
const openai = new OpenAIApi(configuration);


client.once('ready', () => {
  console.log(`${client.user.username} Adıyla Discorda Giriş Yapıldı!`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
    const args = message.content.split(" ");
  const msg = message.content.toLowerCase();
    if(!msg.startsWith(client.user) || !msg.startsWith("boruteks")) return; // Bu Kod Boruteks Yazılmamışsa veya Etiketlenmemiş ise Hiç Birşey Yapmamasını Sağlar 
 const mesaj = message.content.replace(args[0], "")
 
 
    
    const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: mesaj,
  max_tokens: 2048,
  temperature: 0,

});

    const content = await response.data.choices[0].text.trim()
    if(content.length < 2000) {
    message.reply(content);
} else {
    message.reply({ embeds: [new MessageEmbed().setDescription(content).setFooter("Yazı Çok Uzun Olduğu İçin Embede Yazdım").setColor("BLUE")]})
}
 
    

  
});



client.login('TOKEN');

