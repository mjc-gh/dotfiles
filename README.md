### Aliases

```
alias ll="ls -al"
alias g="git"
alias gs="git status"
alias gb="git branch"
alias gc="git checkout"

__git_complete gs _git_status
__git_complete gb _git_branch
__git_complete gc _git_checkout
```

### Functions

```
jqe() {                                                                                                                                                           
  jq -C 'walk(if type == "string" and length > 64 then .[0:64] + "..." else . end)' $1 \                                                                          
    | less -R                                                                                                                                                     
}
```

### macOS Brew Completions

```
if [[ -s $BREW_PREFIX/etc/profile.d/bash_completion.sh ]]; then
  . "$BREW_PREFIX/etc/profile.d/bash_completion.sh"
fi

for completion in "$BREW_PREFIX/etc/bash_completion.d/"*
do
  . $completion
done
```
