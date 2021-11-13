
# import the unsafeGetToken and AppProvider
cat <<EOF > /tmp/adalo-app-sed
/proton-runner/a\\
import { AppProvider } from 'adalo-data-preloader';\
import { unsafeGetToken } from '@protonapp/proton-runner/lib/ducks/auth'\\
EOF

sed -i.bak "$(cat /tmp/adalo-app-sed)" App.js

# wrap the ProtonRunner with the AppProvider
cat <<EOF > /tmp/adalo-app-sed
/return (/a\\
		<AppProvider app={app} unsafeGetToken={unsafeGetToken}>\\
EOF

sed -i.bak "$(cat /tmp/adalo-app-sed)" App.js

# close the AppProvider
cat <<EOF > /tmp/adalo-app-sed
/\/>/a\\
		</AppProvider>\\
EOF

sed -i.bak "$(cat /tmp/adalo-app-sed)" App.js

# now we need to export the tokens from proton-runner to access them
