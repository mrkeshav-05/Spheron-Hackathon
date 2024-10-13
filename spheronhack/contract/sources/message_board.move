module VideoPlatform::Credits {
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::aptos_coin::AptosCoin;
    use std::signer;
    use std::error;

    /// A struct to store the user's credit balance
    struct UserCredits has key {
        balance: u64,
    }

    /// Initializes the `UserCredits` resource for a new user
    public entry fun initialize_user(account: &signer) {
        if (exists<UserCredits>(signer::address_of(account))) {
            return; // Credits already initialized
        }
        move_to(account, UserCredits { balance: 0 });
    }

    /// Function to purchase credits with AptosCoin
    public entry fun purchase_credits(
        user: &signer, 
        platform_wallet: address, 
        amount: u64
    ) acquires CoinStore, UserCredits {
        // Withdraw coins from the user's account
        let coins = coin::withdraw<AptosCoin>(signer::address_of(user), amount);
        
        // Deposit the coins into the platform wallet
        coin::deposit<AptosCoin>(platform_wallet, coins);

        // Update the user's credit balance
        let user_credits = borrow_global_mut<UserCredits>(signer::address_of(user));
        user_credits.balance = user_credits.balance + amount;
    }

    /// Function to watch a video and pay the creator
    public entry fun watch_video(
        user: &signer,
        creator_wallet: address,
        platform_wallet: address,
        credit_cost: u64
    ) acquires UserCredits, CoinStore {
        let user_credits = borrow_global_mut<UserCredits>(signer::address_of(user));
        
        // Ensure the user has enough credits
        if (user_credits.balance < credit_cost) {
            abort error::not_enough_balance(0); // Error code 0 for insufficient credits
        }

        // Deduct credits from the user’s balance
        user_credits.balance = user_credits.balance - credit_cost;

        // Calculate creator's share (90%)
        let creator_share = credit_cost * 9 / 10;

        // Withdraw creator's share from the platform wallet
        let creator_coins = coin::withdraw<AptosCoin>(platform_wallet, creator_share);
        coin::deposit<AptosCoin>(creator_wallet, creator_coins);

        // Remaining 10% stays in the platform wallet as commission
    }
}
