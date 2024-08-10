<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User
{
    public function __construct(
        #[ORM\Id]
        #[ORM\GeneratedValue]
        #[ORM\Column]
        public ?int $id = null,
        #[ORM\Column(length: 255)]
        public ?string $name = null,
        #[ORM\Column(length: 255)]
        public ?string $username = null,
        #[ORM\Column(length: 255)]
        public ?string $email = null,
        #[ORM\Column(length: 255)]
        public ?string $phone = null,
        #[ORM\OneToOne(targetEntity: Address::class, cascade: ["persist", "remove"], fetch: "EAGER")]
        #[ORM\JoinColumn(nullable: false)]
        public ?Address $address = null,
    ) {

    }
}
