@servers(['production' => ['ternobo@ternobo.info']])

@story("deploy",['on'=>"production"])
@if ($withbackup)
    backup-system
@endif
update-code
install-dependencies
setup-database
build-ui
@endstory

@task("backup-system")
cd /home/ternobo/public_html/
php artisan backup:run
@endtask

@task("update-code")
cd /home/ternobo/public_html/
git pull
@endtask

@task("install-dependencies")
cd /home/ternobo/public_html/
composer install --no-interaction --prefer-dist
composer update --no-interaction
composer dump-autoload
@endtask

@task("setup-database")
cd /home/ternobo/public_html/
php artisan migrate --force
@endtask

@task('build-ui', ['on' => 'production'])
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

cd /home/ternobo/public_html/
git pull
npm install
npm run production
@endtask
