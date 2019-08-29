prepare:
	npm install

build:
	sed -i "s,%%%WALLET_BE_ENDPOINT%%%,${NEXUS_API_ENDPOINT},g"  vue/config/prod.env.js
	npm run build
