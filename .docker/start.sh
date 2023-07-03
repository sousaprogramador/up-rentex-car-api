echo "###### Starting configs ######"

if [ ! -f "./.env" ]; then
    cp ./.env.example ./.env
fi
if [ ! -f "./.env.test" ]; then
    cp ./.env.test.example ./.env.test
fi
if [ ! -f "./.env.e2e" ]; then
    cp ./.env.e2e.example ./.env.e2e
fi

yarn install

echo "###### Building @core ######"

yarn dev

tail -f /dev/null

